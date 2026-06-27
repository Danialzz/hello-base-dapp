const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying HelloBase with account:", deployer.address);
  console.log("Account balance:", (await ethers.provider.getBalance(deployer.address)).toString());

  const initialMessage = "Hello, Base! 🔵";

  const HelloBase = await ethers.getContractFactory("HelloBase");
  const contract = await HelloBase.deploy(initialMessage);

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("\n✅ HelloBase deployed to:", address);
  console.log("Initial message:", initialMessage);
  console.log("\nVerify on Basescan:");
  console.log(`npx hardhat verify --network baseSepolia ${address} "${initialMessage}"`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
