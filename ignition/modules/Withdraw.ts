// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

import ERC1967Proxy from '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts-v5/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json';
const ProxyModule = buildModule('ProxyModule', (builder) => {
  // Deploy the implementation contract
  const implementation = builder.contract('Withdraw');


  const proxy = builder.contract("ERC1967Proxy",{abi: ERC1967Proxy.abi, bytecode: ERC1967Proxy.bytecode, contractName: "ERC1967Proxy", sourceName: "ERC1967Proxy.sol", linkReferences: {}}, [])

  builder.call(proxy, "initialize", []);

  return { implementation  };
});

export const WithdrawModule = buildModule('WithdrawModule', (builder) => {
  // Get the proxy from the previous module.
  const { implementation } = builder.useModule(ProxyModule);

  // Create a contract instance using the deployed proxy's address.
  const instance = builder.contractAt('Withdraw', implementation);

  // builder.call(instance, "setSignerChecker", ["0x2420bCD3db774993FEca1E0bB95360c9286b764d"]);

  return { instance, implementation };
});

export default WithdrawModule;
