# BallotDAO Smart Contracts

This directory contains the smart contracts for the BallotDAO governance platform.

## Contract Overview

### 1. BallotToken.sol
- **Purpose**: Governance token with voting power delegation
- **Features**:
  - ERC20 standard with voting extensions
  - Minting capabilities for authorized addresses
  - Minimum voting power requirements
  - Delegation support for voting power

### 2. BallotDAO.sol
- **Purpose**: Main governance contract for proposal creation and voting
- **Features**:
  - Create and manage proposals
  - Cast votes on active proposals
  - Track voting receipts and results
  - Proposal state management (Pending, Active, Canceled, Defeated, Succeeded, Executed)
  - Configurable governance parameters

### 3. DAOTreasury.sol
- **Purpose**: Treasury management for DAO funds
- **Features**:
  - Receive and store ETH and ERC20 tokens
  - Execute approved proposals
  - Secure fund management
  - Transaction tracking and history

## Architecture

```
BallotToken (Governance Token)
    ↓
BallotDAO (Governance Logic)
    ↓
DAOTreasury (Fund Management)
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy the example environment file and configure your settings:
```bash
cp env.example .env
```

Edit `.env` with your configuration:
- `SEPOLIA_URL`: Your Sepolia testnet RPC URL
- `PRIVATE_KEY`: Your deployment wallet private key
- `ETHERSCAN_API_KEY`: Your Etherscan API key for contract verification

### 3. Compile Contracts
```bash
npm run compile
```

### 4. Run Tests
```bash
npm test
```

### 5. Deploy Contracts

#### Local Development
```bash
# Start local node
npm run node

# In another terminal, deploy to local network
npm run deploy
```

#### Sepolia Testnet
```bash
npm run deploy:sepolia
```

## Contract Addresses

After deployment, contract addresses will be saved to `deployment.json`:

```json
{
  "network": "sepolia",
  "contracts": {
    "BallotToken": "0x...",
    "BallotDAO": "0x...",
    "DAOTreasury": "0x..."
  }
}
```

## Governance Parameters

### Default Values
- **Voting Delay**: 1 block
- **Voting Period**: ~1 week (45,818 blocks at 15s block time)
- **Proposal Threshold**: 1,000 BALLOT tokens
- **Quorum Votes**: 10,000 BALLOT tokens
- **Minimum Voting Power**: 100 BALLOT tokens

### Updating Parameters
Only the contract owner can update governance parameters:
```solidity
function updateGovernanceParameters(
    uint256 _votingDelay,
    uint256 _votingPeriod,
    uint256 _proposalThreshold,
    uint256 _quorumVotes
) external onlyOwner
```

## Usage Examples

### Creating a Proposal
```javascript
const title = "DAO Treasury Allocation";
const description = "Allocate 40% to development, 30% to marketing, 30% to community rewards";
const proposalId = await ballotDAO.propose(title, description);
```

### Voting on a Proposal
```javascript
const proposalId = 1;
const support = true; // true for yes, false for no
await ballotDAO.castVote(proposalId, support);
```

### Checking Proposal State
```javascript
const state = await ballotDAO.state(proposalId);
// 0: Pending, 1: Active, 2: Canceled, 3: Defeated, 4: Succeeded, 5: Executed
```

### Getting Voting Receipt
```javascript
const [hasVoted, support, votes] = await ballotDAO.getReceipt(proposalId, voterAddress);
```

## Security Features

- **Reentrancy Protection**: All external calls are protected
- **Access Control**: Owner-only functions for critical operations
- **Input Validation**: Comprehensive parameter validation
- **State Management**: Proper proposal state transitions
- **Vote Integrity**: One vote per address per proposal

## Testing

The test suite covers:
- Token functionality and voting power
- Proposal creation and management
- Voting mechanics and receipt tracking
- Treasury operations
- Integration scenarios

Run tests with:
```bash
npm test
```

## Gas Optimization

Contracts are optimized for gas efficiency:
- Solidity 0.8.20 with optimizer enabled
- Efficient storage patterns
- Minimal external calls
- Optimized data structures

## License

MIT License - see LICENSE file for details.

## Support

For questions or issues, please refer to the main project documentation or create an issue in the repository. 