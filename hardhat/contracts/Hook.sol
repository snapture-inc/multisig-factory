// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import "./INft.sol";
import "./WhiteList.sol";

contract Hook is ISPHook, WhiteList, ReentrancyGuard {
    address public usdc;
    address public nft;

    struct Job {
        uint jobId;
        string name;
        string description;
        uint amount;
        string metadata;
        address minter;
    }

    struct Project {
        uint projectId;
        string name;
        string description;
        uint amount;
        Job[] jobs;
        uint8 action; // 0 = terminated, 1 = created
    }

    mapping(uint => Project) public projects;
    uint public nextProjectId;
    mapping(uint => uint) public nextJobId; // project id => next job id
    mapping(uint => mapping(uint => mapping(address => uint64)))
        public hasAttested;

    uint public threshold = 2;

    string public debugMessage;

    mapping(uint => mapping(uint => uint)) public attestationCount; // projectId => jobId => count

    error NumberBelowThreshold();
    error UnsupportedOperation();

    event Deposit(address indexed user, uint projectId, uint256 amount);
    event Withdrawn(
        address indexed user,
        uint projectId,
        uint256 amount,
        string reason
    );
    event ProjectCreated(uint indexed projectId, uint amount);
    event JobCreated(
        uint indexed projectId,
        uint indexed jobId,
        string name,
        string description,
        uint amount,
        string metadata,
        address minter
    );
    event ProjectTerminated(uint indexed projectId, uint amount);

    constructor(address _nft, address _usdc) {
        nft = _nft;
        usdc = _usdc;
    }

    // Add a new project
    function createProject(string memory _description, uint _amount) public {
        // Check balance
        require(
            IERC20(usdc).balanceOf(msg.sender) >= _amount,
            "Insufficient balance"
        );
        // Check allowance
        require(
            IERC20(usdc).allowance(msg.sender, address(this)) >= _amount,
            "Insufficient allowance"
        );

        Project storage project = projects[nextProjectId];
        project.projectId = nextProjectId;
        project.description = _description;
        project.amount = _amount;
        project.action = 1;

        // transfer USDC to contract
        IERC20(usdc).transferFrom(msg.sender, address(this), _amount);

        // Emit ProjectCreated event
        emit ProjectCreated(nextProjectId, _amount);

        nextProjectId++;
    }

    function terminateProject(uint projectId) external onlyOwner {
        require(projectId < nextProjectId, "Project does not exist.");
        Project storage project = projects[projectId];
        project.action = 0;

        // transfer remaining USDC to owner
        IERC20(usdc).transfer(msg.sender, project.amount);

        emit ProjectTerminated(projectId, project.amount);
    }

    // Add a job to a project
    function createJob(
        uint _projectId,
        string memory _jobName,
        string memory _jobDescription,
        uint _jobAmount,
        string memory _jobMetadata
    ) public {
        require(_projectId < nextProjectId, "Project does not exist.");
        Job memory newJob = Job({
            jobId: nextJobId[_projectId],
            name: _jobName,
            description: _jobDescription,
            amount: _jobAmount,
            metadata: _jobMetadata,
            minter: msg.sender
        });
        projects[_projectId].jobs.push(newJob);

        // Emit JobCreated event
        emit JobCreated(
            _projectId,
            nextJobId[_projectId],
            _jobName,
            _jobDescription,
            _jobAmount,
            _jobMetadata,
            msg.sender
        );

        nextJobId[_projectId]++;
    }

    // deposit USDC
    function deposit(uint projectId, uint amount) external payable {
        // deposit USDC
        IERC20(usdc).transferFrom(msg.sender, address(this), amount);

        emit Deposit(msg.sender, projectId, amount);
    }

    // Get a specific project by its ID
    function getProject(
        uint _projectId
    )
        public
        view
        returns (uint, string memory, string memory, uint, Job[] memory)
    {
        require(_projectId < nextProjectId, "Project does not exist.");
        Project storage project = projects[_projectId];
        return (
            project.projectId,
            project.name,
            project.description,
            project.amount,
            project.jobs
        );
    }

    // Get a specific job within a project
    function getJob(
        uint _projectId,
        uint _jobId
    )
        public
        view
        returns (uint, string memory, string memory, uint, string memory)
    {
        require(_projectId < nextProjectId, "Project does not exist.");
        Project storage project = projects[_projectId];
        require(_jobId < project.jobs.length, "Job does not exist.");
        Job storage job = project.jobs[_jobId];
        return (job.jobId, job.name, job.description, job.amount, job.metadata);
    }

    function _finalizeJob(uint projectId, uint jobId) public {
        debugMessage = "finalizeJob";
        require(projectId < nextProjectId, "Project does not exist.");
        Project storage project = projects[projectId];
        require(jobId < project.jobs.length, "Job does not exist.");
        Job storage job = project.jobs[jobId];

        debugMessage = "finalizeJob: mint NFT";
        // mint NFT
        string memory tokenUri = project.jobs[jobId].metadata;
        INft(nft).mint(job.minter, projectId, jobId, tokenUri);
        debugMessage = "finalizeJob: transfer USDC";
        // release fund
        IERC20(usdc).transfer(project.jobs[jobId].minter, project.amount);

        debugMessage = "finalizeJob: emit event";
        // remove job from project
        // delete project.jobs[jobId];
    }

    function emergencyWithdraw(
        uint projectId,
        uint amount,
        string calldata reason
    ) external onlyOwner {
        IERC20(usdc).transfer(msg.sender, amount);

        emit Withdrawn(msg.sender, projectId, amount, reason);
    }

    function setThreshold(uint256 _threshold) external onlyOwner {
        threshold = _threshold;
    }

    function _checkThreshold(uint256 number) internal view returns (bool) {
        // solhint-disable-next-line custom-errors
        return number >= threshold;
    }

    function didReceiveAttestation(
        address attester,
        uint64, // schemaId
        uint64 attestationId, // attestationId
        bytes calldata // extraData
    ) external payable {
        _checkAttesterWhitelistStatus(attester);
        Attestation memory attestation = ISP(_msgSender()).getAttestation(
            attestationId
        );

        (uint projectId, uint jobId) = abi.decode(
            attestation.data,
            (uint256, uint256)
        ); // projectId and jobId

        // Check if the signer has already attested
        require(
            hasAttested[projectId][jobId][attestation.attester] == 0,
            "Signer has already attested"
        );
        // Mark the signer as having attested
        hasAttested[projectId][jobId][attestation.attester] = attestationId;

        attestationCount[projectId][jobId]++;
        if (_checkThreshold(attestationCount[projectId][jobId])) {
            _finalizeJob(projectId, jobId);
        }
    }

    function didReceiveAttestation(
        address, // attester,
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure {
        revert UnsupportedOperation();
    }

    function didReceiveRevocation(
        address, // attester,
        uint64, // schemaId
        uint64, // attestationId
        bytes calldata // extraData
    ) external payable {
        revert UnsupportedOperation();
    }

    function didReceiveRevocation(
        address, // attester,
        uint64, // schemaId
        uint64, // attestationId
        IERC20, // resolverFeeERC20Token
        uint256, // resolverFeeERC20Amount
        bytes calldata // extraData
    ) external pure {
        revert UnsupportedOperation();
    }
}
