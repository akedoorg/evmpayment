import { ethers } from "hardhat";
import { Withdraw } from "../typechain-types";

const iface = new ethers.Interface([
    "error InvalidValue(string message)"
]);

const errorData = "0x432f5b4a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000157369676e6572206973206e6f7420636f72726563740000000000000000000000";  //
console.log(iface.parseError(errorData));
