require('dotenv').config({ path: '../.env' });
const { ethers } = require("hardhat");
const fs = require('fs');
const path = require('path');

// Log environment variables for debugging
console.log('Using PRIVATE_KEY:', process.env.PRIVATE_KEY ? 'Set' : 'Not set');

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
  const estimatedDeploymentCost = ethers.parseEther("0.01");
  if (balance < estimatedDeploymentCost) {
    throw new Error(`Not enough ETH in the deployer account. Need at least ${ethers.formatEther(estimatedDeploymentCost)} ETH, but only have ${ethers.formatEther(balance)} ETH.`);
  }

  // Deploy BallotToken first
  console.log("\n1. Deploying BallotToken...");
  const BallotToken = await ethers.getContractFactory("BallotToken");
  const ballotToken = await BallotToken.deploy(deployer.address);
  await ballotToken.waitForDeployment();
  const ballotTokenAddress = await ballotToken.getAddress();
  console.log(`✅ BallotToken deployed to: ${ballotTokenAddress}`);

  // Deploy BallotDAO
  console.log("\n2. Deploying BallotDAO...");
  const BallotDAO = await ethers.getContractFactory("BallotDAO");
  const ballotDAO = await BallotDAO.deploy(ballotTokenAddress, deployer.address);
  await ballotDAO.waitForDeployment();
  const ballotDAOAddress = await ballotDAO.getAddress();
  console.log(`✅ BallotDAO deployed to: ${ballotDAOAddress}`);

  // Deploy DAOTreasury
  console.log("\n3. Deploying DAOTreasury...");
  const DAOTreasury = await ethers.getContractFactory("DAOTreasury");
  const daoTreasury = await DAOTreasury.deploy(ballotDAOAddress, ballotTokenAddress, deployer.address);
  await daoTreasury.waitForDeployment();
  const daoTreasuryAddress = await daoTreasury.getAddress();
  console.log(`✅ DAOTreasury deployed to: ${daoTreasuryAddress}`);

  // Set up permissions
  console.log("\n4. Setting up permissions...");
  
  // Add DAO as minter in token contract
  const addMinterTx = await ballotToken.addMinter(balletDAOAddress);
  await addMinterTx.wait();
  console.log("✅ BallotDAO added as minter to BallotToken");
  
  // Transfer initial tokens to treasury
  const initialSupply = ethers.parseEther("1000000");
  const transferTx = await ballotToken.transfer(daoTreasuryAddress, initialSupply);
  await transferTx.wait();
  console.log(`✅ Transferred ${ethers.formatEther(initialSupply)} tokens to treasury`);

  // Save deployment info
  const deploymentInfo = {
    network: "umi",
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      BallotToken: ballotTokenAddress,
      BallotDAO: ballotDAOAddress,
      DAOTreasury: daoTreasuryAddress
    }
  };

  // Create deployments directory if it doesn't exist
  const deploymentsDir = path.join(__dirname, '..', 'deployments');
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  // Save deployment info to file
  const deploymentFile = path.join(deploymentsDir, `deployment-umi-${Date.now()}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  
  console.log("\n📝 Deployment info saved to:", path.relative(process.cwd(), deploymentFile));
  console.log("\n🔍 Verify contracts with:");
  console.log(`npx hardhat verify --network umi ${ballotTokenAddress} ${deployer.address}`);
  console.log(`npx hardhat verify --network umi ${ballotDAOAddress} ${ballotTokenAddress} ${deployer.address}`);
  console.log(`npx hardhat verify --network umi ${daoTreasuryAddress} ${ballotDAOAddress} ${ballotTokenAddress} ${deployer.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
