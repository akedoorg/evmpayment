import { ethers } from "hardhat";
import dotenv from "dotenv"
dotenv.config()

async function main(){


    const provider = new ethers.JsonRpcProvider(process.env.BaseRpc as string)
    const sender = new ethers.Wallet(process.env.BaseSepoliaAccount as string, provider)
   
    const message = "0x77AdaA1ee0D0CC206cF518bf18922808FFd512e4hello0x77AdaA1ee0D0CC206cF518bf18922808FFd512e4"
    console.log(message)
    const signature = await sender.signMessage(message)
    console.log(signature)

    const verify = ethers.verifyMessage(message, signature)
    console.log(verify)
}

main()