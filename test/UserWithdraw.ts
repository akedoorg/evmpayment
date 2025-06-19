import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { token } from "../typechain-types/@openzeppelin/contracts";



describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const Lock = await hre.ethers.getContractFactory("Withdraw");

    const lock = await hre.upgrades.deployProxy(Lock)

    await lock.waitForDeployment();

    // await owner.sendTransaction({
    //   to: lock,
    //   value: hre.ethers.parseEther("10.0")
    // })

    const poolAddress = await lock.getAddress()

    console.log("----", poolAddress)
    const defaultTokenCount = hre.ethers.parseEther("10000000")
    const Token = await hre.ethers.getContractFactory("AKEToken")
    const token = await Token.deploy(poolAddress, defaultTokenCount)


    console.log("token adress", await token.getAddress())

    await lock.setSignerChecker("0x20c7Ba88f53BE5491EE73E34e02F30836C764721")
    const tokenAddress = await token.getAddress()
    return { lock, token, owner, otherAccount, defaultTokenCount, tokenAddress };
  }

  //0x27d54922e37914519efa4483bd1c76b121c409fa67ce188c993c1dbf39e74d6619196a7375dbdbc50617c5658af76b59807248c292d170070444e47c5355e8d81c

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, owner , otherAccount} = await loadFixture(deployOneYearLockFixture);
    });

    it("userwithdraw signature error", async function () {
      const { lock, token, owner , otherAccount, defaultTokenCount, tokenAddress} = await loadFixture(deployOneYearLockFixture);

      const payload = "mock_payload"
      const amount = hre.ethers.parseEther("1")    
      const expectedUnlockTime = 1743482588;
      const noncew = 1743482288041831;
      const sign = "0x00310fee49ce98a1e6374b72dd9bbc5a4a31735e898ebd5ea8fe2eafb08a432a13304297527e4f8758748dd6e2dab43fa6ef6eb5a4f18ec4663cc8061df79ba91c"

      console.log("other account", otherAccount.address)
      const lc = lock.connect(otherAccount)
      const tx = lc.userWithdraw(
        {
          amount: amount,
          token: tokenAddress,
          expire: expectedUnlockTime,
          nonce: noncew,
          signature: sign,
          payload: payload
        }
      )
      await expect(tx).to.be.revertedWith("error1");

      expect(await token.balanceOf(await lock.getAddress())).to.equal(
        defaultTokenCount
      );
      expect(await token.balanceOf(await otherAccount.getAddress())).to.equal(
        0
      );
    });

    it("userwithdraw sucess and nonce repeated", async function () {
      const { lock, token, owner , otherAccount, defaultTokenCount, tokenAddress} = await loadFixture(deployOneYearLockFixture);

      const payload = "mock_payload"
      const amount = hre.ethers.parseEther("1.23")  
      const expectedUnlockTime = 2695803997;
      const noncew = 1749723997214481;
      const sign = "0x1f935c9f391dcb3477f84216e844b4728bd5eaeab68a732e7fff1e857b17bfdb22c6263b42ed72fbddcbf2f74b8af3c53e069cce188be7404e94aa127ccb8eca1b"

      console.log("other account", otherAccount.address)
      const lc = lock.connect(otherAccount)
      const tx = lc.userWithdraw(
        {
          amount: amount,
          token: tokenAddress,
          expire: expectedUnlockTime,
          nonce: noncew,
          signature: sign,
          payload: payload
        } 
      )
      await expect(tx)
      .to.emit(lock, "WithdrawEvent")
      .withArgs(otherAccount.address,1, amount, hre.ethers.toUtf8Bytes(payload));
      await expect( tx).to.not.be.reverted;

      expect(await token.balanceOf(await lock.getAddress())).to.equal(
        defaultTokenCount - amount
      );
      expect(await token.balanceOf(await otherAccount.getAddress())).to.equal(
        amount
      );

      const tx2 = lc.userWithdraw(
        {
          amount: amount,
          token: tokenAddress,
          expire: expectedUnlockTime,
          nonce: noncew,
          signature: sign,
          payload: payload
        }
      )
      await expect( tx2).to.be.revertedWith("error2");

      expect(await token.balanceOf(await lock.getAddress())).to.equal(
        defaultTokenCount - amount
      );
      expect(await token.balanceOf(await otherAccount.getAddress())).to.equal(
        amount
      );
    });

    it("userwithdraw expire error", async function () {
      const { lock, token, owner , otherAccount, defaultTokenCount, tokenAddress} = await loadFixture(deployOneYearLockFixture);

      const payload = "mock_payload"
      const amount = hre.ethers.parseEther("1.23")    
      const expectedUnlockTime = 1749723018;
      const noncew = 1749723318049663;
      const sign = "0xb05fbf2908633b95a89c45381fc4b3d6ac45fe2da75cc00c6518cbe1e091dbd90512ca10f1b7b1ed4addb6d90b90cc5a9b2f49035cd46bc2ec49c4bf545f82be1c"

      console.log("other account", otherAccount.address)
      const lc = lock.connect(otherAccount)
      const tx = lc.userWithdraw(
        {
          amount: amount,
          token: tokenAddress,
          expire: expectedUnlockTime,
          nonce: noncew,
          signature: sign,
          payload: payload
        }
      )
      await expect( tx).to.be.revertedWith("error3");

      expect(await token.balanceOf(await lock.getAddress())).to.equal(
        defaultTokenCount
      );
      expect(await token.balanceOf(await otherAccount.getAddress())).to.equal(
        0
      );
    });

    it("withdraw", async function () {
      const { lock,token, owner , otherAccount, tokenAddress} = await loadFixture(deployOneYearLockFixture);
      const lc = lock.connect(owner)
      const tokenImpl = await hre.ethers.getContractAt("AKEToken", await token.getAddress())
      const lockAddress = await lock.getAddress()
      const lockAmount = await tokenImpl.balanceOf(lockAddress)
      console.log("token impl",lockAmount)
      await lc.withdraw(tokenAddress);

      console.log("owner impl", await tokenImpl.balanceOf(await owner.getAddress()))
      expect(await tokenImpl.balanceOf(await owner.getAddress())).to.equal(
        lockAmount
      );
    });
  });
});
