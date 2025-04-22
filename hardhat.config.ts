import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-tracer"
import dotenv from "dotenv"
dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1_337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80","0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    },
    baseSepolia: {
      url: process.env.BaseSepoliaRpc as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    base: {
      url: process.env.BaseRpc as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    arbSepolia: {
      url: process.env.ArbSepoliaRpc as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    arb: {
      url: process.env.ArbRpc as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    sepolia: {
      url: process.env.Sepolia as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    main: {
      url: process.env.Main as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    bnbtest: {
      url: process.env.BNBTest as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    bnb: {
      url: process.env.BNBMain as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    }
  },
};

export default config;
