require('dotenv').config({ path: '../.env' });
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

// Log environment variables for debugging
console.log('Using SEPOLIA_URL:', process.env.SEPOLIA_URL ? 'Set' : 'Not set');
console.log('Using PRIVATE_KEY:', process.env.PRIVATE_KEY ? 'Set' : 'Not set');
console.log('Using ETHERSCAN_API_KEY:', process.env.ETHERSCAN_API_KEY ? 'Set' : 'Not set');

async function main() {
  // Load deployment account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Get and log balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");
  
  // Set gas price and limit
  const gasPrice = await ethers.provider.getFeeData();
  console.log("Current gas price:", ethers.formatUnits(gasPrice.gasPrice, 'gwei'), "gwei");
  
  // Check if we have enough ETH to deploy
  const estimatedDeploymentCost = ethers.parseEther("0.01"); // Reduced from 0.1 ETH
  if (balance < estimatedDeploymentCost) {
    throw new Error(`Not enough ETH in the deployer account. Need at least ${ethers.formatEther(estimatedDeploymentCost)} ETH, but only have ${ethers.formatEther(balance)} ETH.`);
  }

  // Deploy BallotToken first
  console.log("\n1. Deploying BallotToken...");
  const BallotToken = await ethers.getContractFactory("BallotToken");
  const ballotToken = await BallotToken.deploy(deployer.address);
  await ballotToken.waitForDeployment();
  const ballotTokenAddress = await ballotToken.getAddress();
  console.log("✅ BallotToken deployed to:", ballotTokenAddress);

  // Deploy BallotDAO
  console.log("\n2. Deploying BallotDAO...");
  const BallotDAO = await ethers.getContractFactory("BallotDAO");
  const ballotDAO = await BallotDAO.deploy(ballotTokenAddress, deployer.address);
  await ballotDAO.waitForDeployment();
  const ballotDAOAddress = await ballotDAO.getAddress();
  console.log("✅ BallotDAO deployed to:", ballotDAOAddress);

  // Deploy DAOTreasury
  console.log("\n3. Deploying DAOTreasury...");
  const DAOTreasury = await ethers.getContractFactory("DAOTreasury");
  const daoTreasury = await DAOTreasury.deploy(ballotDAOAddress, ballotTokenAddress, deployer.address);
  await daoTreasury.waitForDeployment();
  const daoTreasuryAddress = await daoTreasury.getAddress();
  console.log("✅ DAOTreasury deployed to:", daoTreasuryAddress);

  // Configure permissions
  console.log("\n4. Setting up permissions...");
  
  // Add BallotDAO as minter to BallotToken
  const addMinterTx = await ballotToken.addMinter(ballotDAOAddress);
  await addMinterTx.wait();
  console.log("✅ BallotDAO added as minter to BallotToken");

  // Transfer some tokens to the treasury for initial funding
  const treasuryAmount = ethers.parseEther("1000000"); // 1M tokens
  const transferTx = await ballotToken.transfer(daoTreasuryAddress, treasuryAmount);
  await transferTx.wait();
  console.log("✅ Transferred", ethers.formatEther(treasuryAmount), "tokens to treasury");

  // Save deployment info to a file
  const deploymentInfo = {
    network: 'sepolia',
    timestamp: new Date().toISOString(),
    contracts: {
      BallotToken: ballotTokenAddress,
      BallotDAO: ballotDAOAddress,
      DAOTreasury: daoTreasuryAddress
    },
    deployer: deployer.address,
    deploymentBlock: await ethers.provider.getBlockNumber()
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, '../deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  // Write deployment info to file
  const deploymentFile = path.join(deploymentsDir, `deployment-sepolia-${Date.now()}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n📝 Deployment info saved to: ${deploymentFile}`);

  // Print verification commands
  console.log("\n🔍 Verify contracts with:");
  console.log(`npx hardhat verify --network sepolia ${ballotTokenAddress} ${deployer.address}`);
  console.log(`npx hardhat verify --network sepolia ${ballotDAOAddress} ${ballotTokenAddress} ${deployer.address}`);
  console.log(`npx hardhat verify --network sepolia ${daoTreasuryAddress} ${ballotDAOAddress} ${ballotTokenAddress} ${deployer.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
