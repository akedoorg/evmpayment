// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BuyItemModule = buildModule("BuyItemModule", (m) => {

  const buyItem = m.contract("BuyItem");

  return { buyItem };
});

export default BuyItemModule;
