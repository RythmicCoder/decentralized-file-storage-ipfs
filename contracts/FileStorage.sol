// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FileStorage {

    string[] public files;

    function storeFile(string memory cid) public {
        files.push(cid);
    }

    function getFiles() public view returns (string[] memory) {
        return files;
    }
}