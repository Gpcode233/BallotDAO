const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy BallotToken first
  console.log("\nDeploying BallotToken...");
  const BallotToken = await ethers.getContractFactory("BallotToken");
  const ballotToken = await BallotToken.deploy(deployer.address);
  await ballotToken.waitForDeployment();
  const ballotTokenAddress = await ballotToken.getAddress();
  console.log("BallotToken deployed to:", ballotTokenAddress);

  // Deploy BallotDAO
  console.log("\nDeploying BallotDAO...");
  const BallotDAO = await ethers.getContractFactory("BallotDAO");
  const ballotDAO = await BallotDAO.deploy(ballotTokenAddress, deployer.address);
  await ballotDAO.waitForDeployment();
  const ballotDAOAddress = await ballotDAO.getAddress();
  console.log("BallotDAO deployed to:", ballotDAOAddress);

  // Deploy DAOTreasury
  console.log("\nDeploying DAOTreasury...");
  const DAOTreasury = await ethers.getContractFactory("DAOTreasury");
  const daoTreasury = await DAOTreasury.deploy(ballotDAOAddress, ballotTokenAddress, deployer.address);
  await daoTreasury.waitForDeployment();
  const daoTreasuryAddress = await daoTreasury.getAddress();
  console.log("DAOTreasury deployed to:", daoTreasuryAddress);

  // Add BallotDAO as minter to BallotToken
  console.log("\nSetting up permissions...");
  const addMinterTx = await ballotToken.addMinter(ballotDAOAddress);
  await addMinterTx.wait();
  console.log("BallotDAO added as minter to BallotToken");

  // Transfer some tokens to the treasury for initial funding
  const treasuryAmount = ethers.parseEther("100000"); // 100k tokens
  const transferTx = await ballotToken.transfer(daoTreasuryAddress, treasuryAmount);
  await transferTx.wait();
  console.log("Transferred", ethers.formatEther(treasuryAmount), "tokens to treasury");

  // Verify deployments
  console.log("\nVerifying deployments...");
  const tokenBalance = await ballotToken.balanceOf(deployer.address);
  const treasuryBalance = await ballotToken.balanceOf(daoTreasuryAddress);
  const daoBalance = await ballotToken.balanceOf(ballotDAOAddress);

  console.log("Deployer token balance:", ethers.formatEther(tokenBalance));
  console.log("Treasury token balance:", ethers.formatEther(treasuryBalance));
  console.log("DAO token balance:", ethers.formatEther(daoBalance));

  console.log("\nDeployment Summary:");
  console.log("===================");
  console.log("BallotToken:", ballotTokenAddress);
  console.log("BallotDAO:", ballotDAOAddress);
  console.log("DAOTreasury:", daoTreasuryAddress);
  console.log("Network:", network.name);
  console.log("Deployer:", deployer.address);

  // Save deployment addresses for frontend
  const deploymentInfo = {
    network: network.name,
    deployer: deployer.address,
    contracts: {
      BallotToken: ballotTokenAddress,
      BallotDAO: ballotDAOAddress,
      DAOTreasury: daoTreasuryAddress
    },
    deploymentTime: new Date().toISOString()
  };

  const fs = require('fs');
  fs.writeFileSync(
    'deployment.json',
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("\nDeployment info saved to deployment.json");

  // Create some sample proposals for testing
  console.log("\nCreating sample proposals...");
  
  // Sample proposal 1: DAO Treasury Allocation
  const proposal1Tx = await ballotDAO.propose(
    "DAO Treasury Allocation",
    "Proposal to allocate 40% of DAO treasury to development, 30% to marketing, and 30% to community rewards."
  );
  await proposal1Tx.wait();
  console.log("Sample proposal 1 created");

  // Sample proposal 2: Protocol Upgrade
  const proposal2Tx = await ballotDAO.propose(
    "Protocol Upgrade v2.0",
    "Vote on the proposed upgrade to the protocol that includes new features and improved gas efficiency."
  );
  await proposal2Tx.wait();
  console.log("Sample proposal 2 created");

  // Sample proposal 3: New Core Team Member
  const proposal3Tx = await ballotDAO.propose(
    "New Core Team Member",
    "Vote to approve @cryptodev as a new core team member responsible for smart contract development."
  );
  await proposal3Tx.wait();
  console.log("Sample proposal 3 created");

  console.log("\nDeployment completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 