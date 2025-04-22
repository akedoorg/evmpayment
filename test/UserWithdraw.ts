import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";


describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Lock = await hre.ethers.getContractFactory("Withdraw");
    const lock = await Lock.deploy();

    await owner.sendTransaction({
      to: lock,
      value: hre.ethers.parseEther("10.0")
    })

    console.log("----", await lock.getAddress())

    await lock.setSignerChecker("0x2420bCD3db774993FEca1E0bB95360c9286b764d")
    return { lock, owner, otherAccount };
  }

  const expectedUnlockTime = 1743482588;
  const noncew = 1743482288041831;
  const sign = "0x00310fee49ce98a1e6374b72dd9bbc5a4a31735e898ebd5ea8fe2eafb08a432a13304297527e4f8758748dd6e2dab43fa6ef6eb5a4f18ec4663cc8061df79ba91c"
  //0x27d54922e37914519efa4483bd1c76b121c409fa67ce188c993c1dbf39e74d6619196a7375dbdbc50617c5658af76b59807248c292d170070444e47c5355e8d81c
  const payload = "1hILMY_Bl739Q"
  const amount = hre.ethers.parseEther("0.0000004")

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, owner , otherAccount} = await loadFixture(deployOneYearLockFixture);
    });

    it("userwithdraw", async function () {
      const { lock, owner , otherAccount} = await loadFixture(deployOneYearLockFixture);
      console.log("other account", otherAccount.address)
      const lc = lock.connect(otherAccount)
      const tx = await lc.userWithdraw(
        {
          amount: amount,
          expire: expectedUnlockTime,
          nonce: noncew,
          signature: sign,
          payload: payload
        }
      )
      await expect(tx)
      .to.emit(lock, "WithdrawEvent")
      .withArgs(otherAccount.address, amount, hre.ethers.toUtf8Bytes(payload) );
      await expect( tx.wait()).to.not.be.reverted


      const tx2 = lc.userWithdraw(
        {
          amount: amount,
          expire: expectedUnlockTime,
          nonce: noncew,
          signature: sign,
          payload: payload
        }
      )
      await expect(tx2)
      .to.be.revertedWithCustomError(lock, "InvalidValue").withArgs("sign nonce repeated")
    });

    it("withdraw", async function () {
      const { lock, owner , otherAccount} = await loadFixture(deployOneYearLockFixture);
      const lc = lock.connect(owner)
      await lc.withdraw()
      expect(await hre.ethers.provider.getBalance(lock.target)).to.equal(
        0
      );
    });
  });
});
