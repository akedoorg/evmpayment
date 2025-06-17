import { ethers } from "hardhat";

async function main(){

    const provider = new ethers.JsonRpcProvider("http://localhost:8545")
    const sender = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d", provider)

   const tx = await sender.sendTransaction({to: "0x17b6F50D474C08fC8f5Fb18fE2E921cc1aB5f245", value: ethers.parseEther("100")})
   await tx.wait()
   console.log(tx.hash)
}

main()  