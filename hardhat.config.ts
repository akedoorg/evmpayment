import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
import "hardhat-tracer"
import '@openzeppelin/hardhat-upgrades';

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
      accounts: ["0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
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
    },
    opbnbtest: {
      url: process.env.OpbnbTest as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    },
    opbnb: {
      url: process.env.OpbnbMain as string,
      accounts: [process.env.BaseSepoliaAccount as string]
    }
  },
  etherscan: {
    // apiKey: "KBURMWA1U6HCY49G8V3FY6TGMG83XQGM91",
    apiKey: {
      bnbtest: "KGGDH375J2R9A6TR864TQTAUM9UV4M6575",
      bnb: "KGGDH375J2R9A6TR864TQTAUM9UV4M6575",
      opbnbtest: "KBURMWA1U6HCY49G8V3FY6TGMG83XQGM91",
      opbnb: "KBURMWA1U6HCY49G8V3FY6TGMG83XQGM91",
    },
    customChains: [
      {
        network: "opbnbtest",
        chainId: 5611,
        urls: {
          apiURL:
            "https://api-opbnb-testnet.bscscan.com/api",
          browserURL: "https://opbnb-testnet.bscscan.com/",
        },
        
      },
      {
        network: "opbnb",
        chainId: 204,
        urls: {
          apiURL:
            "https://api-opbnb.bscscan.com/api",
          browserURL: "https://https://opbnb.bscscan.com/",
        },
      },
    ],
  },
};

export default config;
