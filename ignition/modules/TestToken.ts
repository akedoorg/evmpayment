// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const AKEToken = buildModule("AKEToken", (m) => {

  const akeToken = m.contract("AKEToken",["0xdF4b9bCe8Fd779a3B1146Be06C8F6E90436a6209", 1000000000000000000000000000n]);


  return { akeToken };
});

export default AKEToken;
