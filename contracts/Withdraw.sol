// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

struct WithdrawInfo {
    uint256 amount;
    uint256 expire;
    string  payload;
    uint256 nonce;
    bytes  signature;
}

contract Withdraw is Ownable {

    error InvalidValue(string message);
    event WithdrawEvent(address indexed from, uint256 value, bytes payload);
    
    address private _signerChecker;

    mapping(uint256 => bool) private _nonceChecker;
   
    constructor() Ownable(msg.sender){}

    receive() external payable {
    }

    function splitSignature(bytes memory sig)
        public
        pure
        returns (bytes32 r, bytes32 s, uint8 v)
    {
        require(sig.length == 65, "invalid signature length");

        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        return (r, s, v);
    }
    function userWithdraw(WithdrawInfo calldata info) external {
       //check signature
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, info.amount, info.expire, info.payload, info.nonce));
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(info.signature);
        address signer = ecrecover(messageHash, v, r, s);
        require (signer == _signerChecker, InvalidValue("signer is not correct"));
        require(!_nonceChecker[info.nonce], InvalidValue("sign nonce repeated"));
        _nonceChecker[info.nonce] = true;
        require(block.timestamp < info.expire, InvalidValue("signature expired"));
        (bool success, ) = msg.sender.call{value: info.amount}("");
        require(success, "Transfer failed.");
        emit WithdrawEvent(msg.sender, info.amount, bytes(info.payload));
    }

    function setSignerChecker(address checker) external onlyOwner {
        _signerChecker = checker;
    }

    /// @notice 
    function withdraw() external onlyOwner {
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "Transfer failed.");
    }
}