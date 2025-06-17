// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AKEToken is ERC20 {
    constructor( address owner, uint256 totalSupply) ERC20("AKEToken", "AKET") {
        _mint(owner, totalSupply);
    }
}