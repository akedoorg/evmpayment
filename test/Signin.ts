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

    const Lock = await hre.ethers.getContractFactory("SignIn");
    const lock = await Lock.deploy();

    return { lock, owner, otherAccount };
  }

  describe("Deployment", function () {

    it("signIn", async function () {
      const { lock, owner, otherAccount } = await loadFixture(deployOneYearLockFixture);
      const lc = lock.connect(otherAccount);
      await expect(lc.signIn())
        .to.emit(lock, "SignInEvent")
        .withArgs(otherAccount.address);
    });
  });
});
