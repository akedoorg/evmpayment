// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const WithdrawModule = buildModule("WithdrawModule", (m) => {

  const withdrawContext = m.contract("Withdraw");

  m.call(withdrawContext, "setSignerChecker", ["0x2420bCD3db774993FEca1E0bB95360c9286b764d"]);

  return { withdrawContext };
});

export default WithdrawModule;
