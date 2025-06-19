import hre from "hardhat";





async function upgradeWithdraw() {
    const Withdraw = await hre.ethers.getContractFactory("Withdraw");

    const withdraw = await hre.upgrades.upgradeProxy("0xdF4b9bCe8Fd779a3B1146Be06C8F6E90436a6209", Withdraw)

    const poolAddress = await withdraw.getAddress() 
    console.log("----", poolAddress)
}


upgradeWithdraw()