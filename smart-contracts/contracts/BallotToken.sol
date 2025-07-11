// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BallotToken
 * @dev Governance token for BallotDAO with voting power delegation
 */
contract BallotToken is ERC20, ERC20Permit, ERC20Votes, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million tokens
    uint256 public constant MIN_VOTING_POWER = 100 * 10**18; // 100 tokens minimum for voting

    mapping(address => bool) public isMinter;
    
    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    constructor(address initialOwner) 
        ERC20("BallotDAO Token", "BALLOT") 
        ERC20Permit("BallotDAO Token")
        Ownable(initialOwner)
    {
        _mint(initialOwner, INITIAL_SUPPLY);
    }

    /**
     * @dev Add a minter address
     * @param minter Address to grant minting privileges
     */
    function addMinter(address minter) external onlyOwner {
        require(minter != address(0), "Invalid minter address");
        isMinter[minter] = true;
        emit MinterAdded(minter);
    }

    /**
     * @dev Remove a minter address
     * @param minter Address to revoke minting privileges
     */
    function removeMinter(address minter) external onlyOwner {
        require(isMinter[minter], "Address is not a minter");
        isMinter[minter] = false;
        emit MinterRemoved(minter);
    }

    /**
     * @dev Mint new tokens (only minters can call)
     * @param to Address to mint tokens to
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) external {
        require(isMinter[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        require(to != address(0), "Cannot mint to zero address");
        _mint(to, amount);
    }

    /**
     * @dev Check if an address has minimum voting power
     * @param account Address to check
     * @return bool True if account has minimum voting power
     */
    function hasVotingPower(address account) external view returns (bool) {
        return balanceOf(account) >= MIN_VOTING_POWER;
    }

    /**
     * @dev Get voting power for an account
     * @param account Address to get voting power for
     * @return uint256 Voting power amount
     */
    function getVotingPower(address account) external view returns (uint256) {
        return balanceOf(account);
    }

    // Override required functions for ERC20Votes
    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
} 