// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./BallotDAO.sol";

/**
 * @title DAOTreasury
 * @dev Treasury contract for BallotDAO to manage funds and execute proposals
 */
contract DAOTreasury is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    BallotDAO public ballotDAO;
    BallotToken public ballotToken;
    
    struct Transaction {
        uint256 id;
        address target;
        uint256 value;
        bytes data;
        string description;
        bool executed;
        uint256 proposalId;
    }
    
    uint256 public transactionCount;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => bool) public executedProposals;
    
    event TransactionCreated(
        uint256 indexed transactionId,
        address indexed target,
        uint256 value,
        string description,
        uint256 proposalId
    );
    
    event TransactionExecuted(
        uint256 indexed transactionId,
        address indexed target,
        uint256 value,
        bytes data
    );
    
    event FundsReceived(address indexed sender, uint256 amount);
    event FundsWithdrawn(address indexed recipient, uint256 amount);
    
    modifier onlyDAO() {
        require(msg.sender == address(ballotDAO), "Only DAO can call this function");
        _;
    }
    
    constructor(address _ballotDAO, address _ballotToken, address initialOwner) Ownable(initialOwner) {
        ballotDAO = BallotDAO(_ballotDAO);
        ballotToken = BallotToken(_ballotToken);
    }
    
    /**
     * @dev Receive ETH
     */
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
    
    /**
     * @dev Create a transaction from a successful proposal
     * @param target Target address for the transaction
     * @param value ETH value to send
     * @param data Calldata for the transaction
     * @param description Description of the transaction
     * @param proposalId ID of the successful proposal
     * @return uint256 Transaction ID
     */
    function createTransaction(
        address target,
        uint256 value,
        bytes memory data,
        string memory description,
        uint256 proposalId
    ) external onlyDAO returns (uint256) {
        require(target != address(0), "Invalid target address");
        require(!executedProposals[proposalId], "Proposal already executed");
        
        transactionCount++;
        Transaction storage newTransaction = transactions[transactionCount];
        newTransaction.id = transactionCount;
        newTransaction.target = target;
        newTransaction.value = value;
        newTransaction.data = data;
        newTransaction.description = description;
        newTransaction.executed = false;
        newTransaction.proposalId = proposalId;
        
        executedProposals[proposalId] = true;
        
        emit TransactionCreated(
            transactionCount,
            target,
            value,
            description,
            proposalId
        );
        
        return transactionCount;
    }
    
    /**
     * @dev Execute a transaction
     * @param transactionId ID of the transaction to execute
     */
    function executeTransaction(uint256 transactionId) external onlyDAO nonReentrant {
        Transaction storage transaction = transactions[transactionId];
        require(!transaction.executed, "Transaction already executed");
        
        transaction.executed = true;
        
        (bool success, bytes memory returnData) = transaction.target.call{value: transaction.value}(transaction.data);
        
        require(success, "Transaction execution failed");
        
        emit TransactionExecuted(
            transactionId,
            transaction.target,
            transaction.value,
            transaction.data
        );
    }
    
    /**
     * @dev Withdraw ETH from treasury (only owner)
     * @param recipient Address to send ETH to
     * @param amount Amount of ETH to withdraw
     */
    function withdrawETH(address recipient, uint256 amount) external onlyOwner {
        require(recipient != address(0), "Invalid recipient address");
        require(amount <= address(this).balance, "Insufficient balance");
        
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "ETH transfer failed");
        
        emit FundsWithdrawn(recipient, amount);
    }
    
    /**
     * @dev Withdraw ERC20 tokens from treasury (only owner)
     * @param token Token contract address
     * @param recipient Address to send tokens to
     * @param amount Amount of tokens to withdraw
     */
    function withdrawERC20(
        address token,
        address recipient,
        uint256 amount
    ) external onlyOwner {
        require(token != address(0), "Invalid token address");
        require(recipient != address(0), "Invalid recipient address");
        
        IERC20(token).safeTransfer(recipient, amount);
        
        emit FundsWithdrawn(recipient, amount);
    }
    
    /**
     * @dev Get transaction details
     * @param transactionId ID of the transaction
     * @return target Target address
     * @return value ETH value
     * @return data Calldata
     * @return description Description
     * @return executed Whether executed
     * @return proposalId Associated proposal ID
     */
    function getTransaction(uint256 transactionId)
        external
        view
        returns (
            address target,
            uint256 value,
            bytes memory data,
            string memory description,
            bool executed,
            uint256 proposalId
        )
    {
        Transaction storage transaction = transactions[transactionId];
        return (
            transaction.target,
            transaction.value,
            transaction.data,
            transaction.description,
            transaction.executed,
            transaction.proposalId
        );
    }
    
    /**
     * @dev Get treasury balance
     * @return uint256 ETH balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Get ERC20 token balance
     * @param token Token contract address
     * @return uint256 Token balance
     */
    function getTokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
    
    /**
     * @dev Update DAO address (only owner)
     * @param _ballotDAO New DAO address
     */
    function updateDAO(address _ballotDAO) external onlyOwner {
        require(_ballotDAO != address(0), "Invalid DAO address");
        ballotDAO = BallotDAO(_ballotDAO);
    }
} 