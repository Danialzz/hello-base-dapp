require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// Never fall back to a publicly known private key. Local Hardhat tests do not
// need an account, while real deployments must explicitly provide PRIVATE_KEY.
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BASESCAN_API_KEY = process.env.BASESCAN_API_KEY || "";
const DEPLOYER_ACCOUNTS = PRIVATE_KEY ? [PRIVATE_KEY] : [];

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},

    baseSepolia: {
      url: "https://sepolia.base.org",
      chainId: 84532,
      accounts: DEPLOYER_ACCOUNTS,
    },

    base: {
      url: "https://mainnet.base.org",
      chainId: 8453,
      accounts: DEPLOYER_ACCOUNTS,
    },
  },
  etherscan: {
    apiKey: {
      baseSepolia: BASESCAN_API_KEY,
      base: BASESCAN_API_KEY,
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
};
