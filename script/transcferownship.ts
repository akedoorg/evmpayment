import { ethers } from "hardhat";
import { BuyItem, BuyItem__factory } from "../typechain-types";

import dotenv from "dotenv"
dotenv.config()

async function main(){

    const buyContract = BuyItem__factory.connect("0x7e415C51E137a2b39A81D8c35C4911d73295b9eF")

   
    
    const provider = new ethers.JsonRpcProvider(process.env.ArbRpc as string)
    const sender = new ethers.Wallet(process.env.BaseSepoliaAccount as string, provider)
    const b = buyContract.connect(sender)
    const ret = await b.transferOwnership("0xB3Fd9d6E30c601349FA5e0eCC9eCED372935d598")
    await ret.wait()
    console.log(ret.hash)
}

main()