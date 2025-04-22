import { ethers } from "hardhat";
import { BuyItem, BuyItem__factory } from "../typechain-types";

async function main(){

    const buyContract = BuyItem__factory.connect("0x5FbDB2315678afecb367f032d93F642f64180aa3")

   

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")
    const sender = new ethers.Wallet("", provider)
    const b = buyContract.connect(sender)

    const payload = "order"
    await b.buy(ethers.toUtf8Bytes(payload),{ value: ethers.parseEther("0.3") })
}

main()