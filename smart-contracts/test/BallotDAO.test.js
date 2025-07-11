const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BallotDAO", function () {
  let ballotToken;
  let ballotDAO;
  let daoTreasury;
  let owner;
  let user1;
  let user2;
  let user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    // Deploy BallotToken
    const BallotToken = await ethers.getContractFactory("BallotToken");
    ballotToken = await BallotToken.deploy(owner.address);

    // Deploy BallotDAO
    const BallotDAO = await ethers.getContractFactory("BallotDAO");
    ballotDAO = await BallotDAO.deploy(await ballotToken.getAddress(), owner.address);

    // Deploy DAOTreasury
    const DAOTreasury = await ethers.getContractFactory("DAOTreasury");
    daoTreasury = await DAOTreasury.deploy(
      await ballotDAO.getAddress(),
      await ballotToken.getAddress(),
      owner.address
    );

    // Setup permissions
    await ballotToken.addMinter(await ballotDAO.getAddress());

    // Distribute tokens for testing
    await ballotToken.transfer(user1.address, ethers.parseEther("5000"));
    await ballotToken.transfer(user2.address, ethers.parseEther("3000"));
    await ballotToken.transfer(user3.address, ethers.parseEther("2000"));
  });

  describe("BallotToken", function () {
    it("Should have correct initial supply", async function () {
      const totalSupply = await ballotToken.totalSupply();
      expect(totalSupply).to.equal(ethers.parseEther("1000000"));
    });

    it("Should allow minting by authorized addresses", async function () {
      await ballotToken.mint(user1.address, ethers.parseEther("1000"));
      const balance = await ballotToken.balanceOf(user1.address);
      expect(balance).to.equal(ethers.parseEther("6000"));
    });

    it("Should check voting power correctly", async function () {
      const hasVotingPower = await ballotToken.hasVotingPower(user1.address);
      expect(hasVotingPower).to.be.true;

      const votingPower = await ballotToken.getVotingPower(user1.address);
      expect(votingPower).to.equal(ethers.parseEther("5000"));
    });
  });

  describe("BallotDAO", function () {
    it("Should create proposals correctly", async function () {
      const title = "Test Proposal";
      const description = "This is a test proposal";

      await ballotDAO.connect(user1).propose(title, description);

      const [proposer, propTitle, propDescription] = await ballotDAO.getProposal(1);
      expect(proposer).to.equal(user1.address);
      expect(propTitle).to.equal(title);
      expect(propDescription).to.equal(description);
    });

    it("Should not allow proposals without sufficient voting power", async function () {
      const title = "Test Proposal";
      const description = "This is a test proposal";

      await expect(
        ballotDAO.connect(user3).propose(title, description)
      ).to.be.revertedWith("Insufficient voting power to propose");
    });

    it("Should allow voting on proposals", async function () {
      // Create proposal
      await ballotDAO.connect(user1).propose("Test", "Description");

      // Fast forward to voting period
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");

      // Vote
      await ballotDAO.connect(user2).castVote(1, true);
      await ballotDAO.connect(user3).castVote(1, false);

      const [,,, forVotes, againstVotes] = await ballotDAO.getProposal(1);
      expect(forVotes).to.equal(ethers.parseEther("3000"));
      expect(againstVotes).to.equal(ethers.parseEther("2000"));
    });

    it("Should not allow double voting", async function () {
      await ballotDAO.connect(user1).propose("Test", "Description");
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");

      await ballotDAO.connect(user2).castVote(1, true);
      
      await expect(
        ballotDAO.connect(user2).castVote(1, false)
      ).to.be.revertedWith("Already voted");
    });

    it("Should track voting receipts correctly", async function () {
      await ballotDAO.connect(user1).propose("Test", "Description");
      
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");

      await ballotDAO.connect(user2).castVote(1, true);

      const [hasVoted, support, votes] = await ballotDAO.getReceipt(1, user2.address);
      expect(hasVoted).to.be.true;
      expect(support).to.be.true;
      expect(votes).to.equal(ethers.parseEther("3000"));
    });

    it("Should determine proposal state correctly", async function () {
      await ballotDAO.connect(user1).propose("Test", "Description");
      
      // Should be pending initially
      let state = await ballotDAO.state(1);
      expect(state).to.equal(0); // Pending

      // Fast forward to active voting
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      state = await ballotDAO.state(1);
      expect(state).to.equal(1); // Active

      // Fast forward past voting period
      await ethers.provider.send("evm_increaseTime", [45820]);
      await ethers.provider.send("evm_mine");
      
      state = await ballotDAO.state(1);
      expect(state).to.equal(4); // Defeated (no votes cast)
    });

    it("Should allow proposal cancellation by proposer", async function () {
      await ballotDAO.connect(user1).propose("Test", "Description");
      
      await ballotDAO.connect(user1).cancel(1);
      
      const state = await ballotDAO.state(1);
      expect(state).to.equal(2); // Canceled
    });
  });

  describe("DAOTreasury", function () {
    it("Should receive ETH correctly", async function () {
      const amount = ethers.parseEther("1");
      
      await user1.sendTransaction({
        to: await daoTreasury.getAddress(),
        value: amount
      });

      const balance = await daoTreasury.getBalance();
      expect(balance).to.equal(amount);
    });

    it("Should allow owner to withdraw ETH", async function () {
      const amount = ethers.parseEther("1");
      
      await user1.sendTransaction({
        to: await daoTreasury.getAddress(),
        value: amount
      });

      const initialBalance = await ethers.provider.getBalance(owner.address);
      await daoTreasury.withdrawETH(owner.address, amount);
      const finalBalance = await ethers.provider.getBalance(owner.address);
      
      expect(finalBalance).to.be.gt(initialBalance);
    });

    it("Should track ERC20 token balances", async function () {
      const amount = ethers.parseEther("1000");
      await ballotToken.transfer(await daoTreasury.getAddress(), amount);

      const balance = await daoTreasury.getTokenBalance(await ballotToken.getAddress());
      expect(balance).to.equal(amount);
    });
  });

  describe("Integration", function () {
    it("Should handle complete proposal lifecycle", async function () {
      // Create proposal
      await ballotDAO.connect(user1).propose("Integration Test", "Full lifecycle test");
      
      // Fast forward to voting
      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine");
      
      // Vote
      await ballotDAO.connect(user1).castVote(1, true);
      await ballotDAO.connect(user2).castVote(1, true);
      await ballotDAO.connect(user3).castVote(1, false);
      
      // Fast forward past voting period
      await ethers.provider.send("evm_increaseTime", [45820]);
      await ethers.provider.send("evm_mine");
      
      // Check final state
      const state = await ballotDAO.state(1);
      expect(state).to.equal(4); // Should be defeated due to quorum not met
    });
  });
}); 