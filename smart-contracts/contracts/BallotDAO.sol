// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./BallotToken.sol";

/**
 * @title BallotDAO
 * @dev Main governance contract for BallotDAO
 */
contract BallotDAO is Ownable, ReentrancyGuard {
    BallotToken public ballotToken;
    
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 startTime;
        uint256 endTime;
        bool executed;
        bool canceled;
        mapping(address => Receipt) receipts;
    }
    
    struct Receipt {
        bool hasVoted;
        bool support;
        uint256 votes;
    }
    
    enum ProposalState {
        Pending,
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Executed
    }
    
    uint256 public proposalCount;
    uint256 public votingDelay = 1; // 1 block delay
    uint256 public votingPeriod = 45818; // ~1 week at 15s block time
    uint256 public proposalThreshold = 1000 * 10**18; // 1000 tokens to propose
    uint256 public quorumVotes = 10000 * 10**18; // 10,000 tokens for quorum
    
    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public latestProposalIds;
    
    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        string title,
        string description,
        uint256 startTime,
        uint256 endTime
    );
    
    event VoteCast(
        address indexed voter,
        uint256 indexed proposalId,
        bool support,
        uint256 votes
    );
    
    event ProposalCanceled(uint256 indexed proposalId);
    event ProposalExecuted(uint256 indexed proposalId);
    
    modifier onlyTokenHolder() {
        require(ballotToken.balanceOf(msg.sender) > 0, "Must hold tokens to interact");
        _;
    }
    
    constructor(address _ballotToken, address initialOwner) Ownable(initialOwner) {
        ballotToken = BallotToken(_ballotToken);
    }
    
    /**
     * @dev Create a new proposal
     * @param title Title of the proposal
     * @param description Description of the proposal
     * @return uint256 Proposal ID
     */
    function propose(string memory title, string memory description) 
        external 
        onlyTokenHolder 
        returns (uint256) 
    {
        require(
            ballotToken.getVotingPower(msg.sender) >= proposalThreshold,
            "Insufficient voting power to propose"
        );
        require(
            latestProposalIds[msg.sender] == 0 ||
            state(latestProposalIds[msg.sender]) == ProposalState.Executed ||
            state(latestProposalIds[msg.sender]) == ProposalState.Canceled ||
            state(latestProposalIds[msg.sender]) == ProposalState.Defeated,
            "One active proposal per proposer"
        );
        
        uint256 startTime = block.timestamp + votingDelay;
        uint256 endTime = startTime + votingPeriod;
        
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.proposer = msg.sender;
        newProposal.title = title;
        newProposal.description = description;
        newProposal.startTime = startTime;
        newProposal.endTime = endTime;
        newProposal.executed = false;
        newProposal.canceled = false;
        
        latestProposalIds[msg.sender] = proposalCount;
        
        emit ProposalCreated(
            proposalCount,
            msg.sender,
            title,
            description,
            startTime,
            endTime
        );
        
        return proposalCount;
    }
    
    /**
     * @dev Cast a vote on a proposal
     * @param proposalId ID of the proposal to vote on
     * @param support True for yes, false for no
     */
    function castVote(uint256 proposalId, bool support) external onlyTokenHolder {
        require(state(proposalId) == ProposalState.Active, "Proposal not active");
        require(!hasVoted(proposalId, msg.sender), "Already voted");
        
        Proposal storage proposal = proposals[proposalId];
        uint256 votes = ballotToken.getVotingPower(msg.sender);
        
        require(votes > 0, "No voting power");
        
        proposal.receipts[msg.sender].hasVoted = true;
        proposal.receipts[msg.sender].support = support;
        proposal.receipts[msg.sender].votes = votes;
        
        if (support) {
            proposal.forVotes += votes;
        } else {
            proposal.againstVotes += votes;
        }
        
        emit VoteCast(msg.sender, proposalId, support, votes);
    }
    
    /**
     * @dev Execute a successful proposal
     * @param proposalId ID of the proposal to execute
     */
    function execute(uint256 proposalId) external onlyTokenHolder {
        require(state(proposalId) == ProposalState.Succeeded, "Proposal not succeeded");
        proposals[proposalId].executed = true;
        emit ProposalExecuted(proposalId);
    }
    
    /**
     * @dev Cancel a proposal (only proposer or owner)
     * @param proposalId ID of the proposal to cancel
     */
    function cancel(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        require(
            msg.sender == proposal.proposer || msg.sender == owner(),
            "Only proposer or owner can cancel"
        );
        require(state(proposalId) == ProposalState.Pending, "Proposal not pending");
        
        proposal.canceled = true;
        emit ProposalCanceled(proposalId);
    }
    
    /**
     * @dev Get the state of a proposal
     * @param proposalId ID of the proposal
     * @return ProposalState Current state of the proposal
     */
    function state(uint256 proposalId) public view returns (ProposalState) {
        require(proposalCount >= proposalId, "Invalid proposal ID");
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.canceled) {
            return ProposalState.Canceled;
        }
        
        if (block.timestamp <= proposal.startTime) {
            return ProposalState.Pending;
        }
        
        if (block.timestamp <= proposal.endTime) {
            return ProposalState.Active;
        }
        
        if (proposal.forVotes <= proposal.againstVotes || 
            proposal.forVotes < quorumVotes) {
            return ProposalState.Defeated;
        }
        
        if (proposal.executed) {
            return ProposalState.Executed;
        }
        
        return ProposalState.Succeeded;
    }
    
    /**
     * @dev Check if an address has voted on a proposal
     * @param proposalId ID of the proposal
     * @param voter Address to check
     * @return bool True if address has voted
     */
    function hasVoted(uint256 proposalId, address voter) public view returns (bool) {
        return proposals[proposalId].receipts[voter].hasVoted;
    }
    
    /**
     * @dev Get voting receipt for an address
     * @param proposalId ID of the proposal
     * @param voter Address to get receipt for
     * @return hasVoted Whether the address has voted
     * @return support Whether they voted for or against
     * @return votes Number of votes cast
     */
    function getReceipt(uint256 proposalId, address voter) 
        external 
        view 
        returns (bool hasVoted, bool support, uint256 votes) 
    {
        Receipt memory receipt = proposals[proposalId].receipts[voter];
        return (receipt.hasVoted, receipt.support, receipt.votes);
    }
    
    /**
     * @dev Get proposal details
     * @param proposalId ID of the proposal
     * @return proposer Address of proposer
     * @return title Title of proposal
     * @return description Description of proposal
     * @return forVotes Number of for votes
     * @return againstVotes Number of against votes
     * @return startTime Start time of voting
     * @return endTime End time of voting
     * @return executed Whether proposal has been executed
     * @return canceled Whether proposal has been canceled
     */
    function getProposal(uint256 proposalId) 
        external 
        view 
        returns (
            address proposer,
            string memory title,
            string memory description,
            uint256 forVotes,
            uint256 againstVotes,
            uint256 startTime,
            uint256 endTime,
            bool executed,
            bool canceled
        ) 
    {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.startTime,
            proposal.endTime,
            proposal.executed,
            proposal.canceled
        );
    }
    
    /**
     * @dev Update governance parameters (only owner)
     * @param _votingDelay New voting delay
     * @param _votingPeriod New voting period
     * @param _proposalThreshold New proposal threshold
     * @param _quorumVotes New quorum votes
     */
    function updateGovernanceParameters(
        uint256 _votingDelay,
        uint256 _votingPeriod,
        uint256 _proposalThreshold,
        uint256 _quorumVotes
    ) external onlyOwner {
        votingDelay = _votingDelay;
        votingPeriod = _votingPeriod;
        proposalThreshold = _proposalThreshold;
        quorumVotes = _quorumVotes;
    }
} 