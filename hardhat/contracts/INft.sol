// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

interface INft {
    function mint(address to, uint projectId, uint jobId, string memory tokenUri) external;
}
