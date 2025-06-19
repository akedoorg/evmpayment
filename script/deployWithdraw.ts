import hre from "hardhat";





async function deployWithdraw() {
    const Lock = await hre.ethers.getContractFactory("Withdraw");

    const lock = await hre.upgrades.deployProxy(Lock)

    await lock.waitForDeployment();

    const poolAddress = await lock.getAddress()

    const signerChecker = await hre.ethers.getContractAt("Withdraw", poolAddress)

    // await signerChecker.setSignerChecker("0x2420bCD3db774993FEca1E0bB95360c9286b764d")

    console.log("----", poolAddress)
}


deployWithdraw()