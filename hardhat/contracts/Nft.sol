// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Nft is ERC721URIStorage, Ownable {
    address public hookAddress;
    uint256 private tokenId;
    mapping(uint256 => mapping(uint256 => uint256))
        private tokenIdByProjectAndJob;

    constructor() ERC721("Snapture", "SNAP") Ownable(msg.sender) {
        tokenId = 0;
    }

    modifier onlyOwnerOrHook() {
        require(
            msg.sender == hookAddress || msg.sender == owner(),
            "Only the hook contract or owner can call this function"
        );
        _;
    }

    function mint(
        address to,
        uint256 projectId,
        uint256 jobId,
        string memory tokenUri
    ) public onlyOwnerOrHook {
        tokenId++;

        require(_ownerOf(tokenId) == address(0), "tokenId already exists");

        tokenIdByProjectAndJob[projectId][jobId] = tokenId;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenUri);
    }

    // Allow the owner to set hook contract
    function setHookAddress(address _hookAddress) public onlyOwner {
        hookAddress = _hookAddress;
    }

    function totalSupply() external view returns (uint256) {
        return tokenId;
    }

    function getTokenIdByProjectAndJob(
        uint256 projectId,
        uint256 jobId
    ) external view returns (uint256) {
        uint256 _tokenId = tokenIdByProjectAndJob[projectId][jobId];
        require(
            _ownerOf(tokenId) != address(0),
            "Token does not exist for the given projectId and jobId"
        );
        return _tokenId;
    }
}
