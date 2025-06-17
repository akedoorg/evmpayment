// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "hardhat/console.sol";

struct WithdrawInfo {
    uint256 t;
    uint256 amount;
    uint256 expire;
    string  payload;
    uint256 nonce;
    bytes  signature;
}

contract Withdraw is Initializable, UUPSUpgradeable, OwnableUpgradeable {

    using SafeERC20 for IERC20;

    event WithdrawEvent(address indexed from, uint256 t, uint256 value, bytes payload);
    
    address private _signerChecker;
    address public tokenAddress;

    mapping(uint256 => bool) private _nonceChecker;
   
    function initialize() public initializer {
        __Ownable_init(msg.sender); 
        __UUPSUpgradeable_init(); 
        console.log("initialize");
    }

    receive() external payable {
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

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

    function  _withdrawInfoCheck(WithdrawInfo calldata info) internal returns(bool){
        //check signature
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, info.t, info.amount, info.expire, info.payload, info.nonce));
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(info.signature);
        address signer = ecrecover(messageHash, v, r, s);
        require(signer == _signerChecker, "error1");
        require(!_nonceChecker[info.nonce], "error2");

        _nonceChecker[info.nonce] = true;
        require(block.timestamp <= info.expire, "error3");
        return true;
    }

    function userWithdraw(WithdrawInfo calldata info) external {
       if(_withdrawInfoCheck(info)){
            if(info.t == 0){
                (bool success, ) = msg.sender.call{value: info.amount}("");
                require(success, "error4");
            }else if( info.t == 1){
                IERC20 token = IERC20(tokenAddress); 
                token.safeTransfer(msg.sender, info.amount); 
            } 
            emit WithdrawEvent(msg.sender, info.t, info.amount, bytes(info.payload));
       }  
    }

    function setSignerChecker(address checker) external onlyOwner {
        _signerChecker = checker;
    }

     function setTokenAddress(address token) external onlyOwner {
        tokenAddress = token;
    }

    /// @notice 
    function withdraw( uint256 t) external onlyOwner {
        if(t == 0){
            (bool success, ) = payable(owner()).call{value: address(this).balance}("");
            require(success, "Transfer failed.");
        }else if(t == 1){
            IERC20 token = IERC20(tokenAddress); 
            token.safeTransfer(owner(), token.balanceOf(address(this))); 
        }
    }
}