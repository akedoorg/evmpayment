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

    const Lock = await hre.ethers.getContractFactory("BuyItem");
    const lock = await Lock.deploy();

    return { lock, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { lock, owner , otherAccount} = await loadFixture(deployOneYearLockFixture);
    });

    it("pay", async function () {
      const { lock, owner , otherAccount} = await loadFixture(deployOneYearLockFixture);
      const lc = lock.connect(otherAccount)
      await lc.buy(hre.ethers.toUtf8Bytes("test code"), { value: hre.ethers.parseEther("0.1") });

      expect(await hre.ethers.provider.getBalance(lock.target)).to.equal(
        hre.ethers.parseEther("0.1")
      );
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
