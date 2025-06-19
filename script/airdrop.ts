import hre, { ethers } from "hardhat";

async function airdrop() {



const provider = new ethers.JsonRpcProvider(process.env.BNBTest as string)
const wallet = new ethers.Wallet(process.env.Airdrop as string, provider)


const signerChecker = await hre.ethers.getContractAt("Withdraw", "0xdF4b9bCe8Fd779a3B1146Be06C8F6E90436a6209", wallet)

const payload = "testCode"
const tokenAddress = "0xB2aD10A2Ea4C9bF8F4A20C5FADf04bdEA63b08A1"
      const amount = hre.ethers.parseEther("332.83")
      const expectedUnlockTime = 1750242916;
      const noncew = 1750242616403549;
      const sign = "0xfd6443aa3cae361b644bd3396b76fbc9006e685bb235b7741047807b684b4c36676c51aa04eb67d22eba186568cbc31d0cbd54a683d5cf54c85bd38d87191dee1b"

      console.log("----", "start", wallet.address)
      const tx =await  signerChecker.userWithdraw(
        {
          amount: amount,
          token: tokenAddress,
          expire: expectedUnlockTime,
          nonce: noncew,
          signature: sign,
          payload: payload
        }
      )
      const receipt =  await tx.wait(1)
      console.log("---- tx hash", receipt?.hash)
}

airdrop()