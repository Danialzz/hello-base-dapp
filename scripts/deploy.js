const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("══════════════════════════════════════════");
  console.log("  HelloBase Deployer");
  console.log("══════════════════════════════════════════");
  console.log("Deployer:", deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "ETH");
  console.log("");

  if (balance === 0n) {
    console.error("❌ Wallet has 0 ETH. Get free Base Sepolia ETH from:");
    console.error("   https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet");
    console.error("   or https://faucet.quicknode.com/base/sepolia");
    process.exit(1);
  }

  const initialMessage = "Hello, Base! 🔵 Welcome to the on-chain message board.";

  console.log("Deploying HelloBase...");
  const HelloBase = await ethers.getContractFactory("HelloBase");
  const contract = await HelloBase.deploy(initialMessage);

  await contract.waitForDeployment();
  const address = await contract.getAddress();

  console.log("");
  console.log("✅ HelloBase deployed successfully!");
  console.log("──────────────────────────────────────────");
  console.log("Contract address:", address);
  console.log("Initial message :", initialMessage);
  console.log("Network         : Base Sepolia (84532)");
  console.log("──────────────────────────────────────────");
  console.log("");
  console.log("Next steps:");
  console.log("1. Copy the address above into frontend/index.html");
  console.log("   → const CONTRACT_ADDRESS = \"" + address + "\";");
  console.log("");
  console.log("2. Verify on Basescan (optional):");
  console.log(`   npx hardhat verify --network baseSepolia ${address} "${initialMessage}"`);
  console.log("");
  console.log("3. Open frontend/index.html in your browser");
  console.log("   and connect MetaMask (Base Sepolia).");
  console.log("");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
