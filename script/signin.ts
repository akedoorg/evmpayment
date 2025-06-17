import { ethers } from "hardhat";
import { SignIn__factory} from "../typechain-types";

async function main(){

    const provider = new ethers.JsonRpcProvider("https://opbnb-testnet.publicnode.com")
    const sender = new ethers.Wallet("7acc48cf0bb72e5a9c1190aebc4b250987c088bd44dbff89f039fd0fd5353b84", provider)

    
    const signIn = new ethers.Contract("0xde3d7d06c8e07f3a8031f35451215a0e33eb00b3",SignIn__factory.abi, sender)

    const tx = await signIn.signIn()
    console.log(tx)
}

main().catch(console.error)