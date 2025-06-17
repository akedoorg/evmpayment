// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AKEToken = buildModule("AKEToken", (m) => {

  const akeToken = m.contract("AKEToken",["0x2420bCD3db774993FEca1E0bB95360c9286b764d", 1000000]);


  return { akeToken };
});

export default AKEToken;
