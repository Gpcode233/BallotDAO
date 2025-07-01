# 🗳️ BallotDAO

**BallotDAO** is a decentralized voting platform designed to bring transparency, security, and accessibility to digital elections. Whether it's a DAO proposal or a community poll, BallotDAO empowers users to vote trustlessly via blockchain technology.

🌐 Live Site: [ballotdao.vercel.app](https://ballotdao.vercel.app)

---

## ⚙️ Features

- ✅ **Decentralized Voting**: Cast and verify votes using blockchain (no central control).
- 🔐 **Secure & Transparent**: Every vote is recorded on-chain for full auditability.
- 👥 **Multi-Wallet Support**: Connect with any wallet using RainbowKit (MetaMask, WalletConnect, Coinbase Wallet, etc.).
- 📊 **Live Results**: View real-time vote counts and outcomes.
- 🧑‍⚖️ **Proposal Creation**: Initiators can create and manage polls.
- 💻 **User-Friendly Interface**: Intuitive and responsive front-end with seamless UX.
- 🌐 **Avalanche Network**: Built on Avalanche C-Chain for fast and low-cost transactions.

---

## 🛠 Tech Stack

| Layer       | Technology                        |
|------------|------------------------------------|
| Frontend   | React, Vite, Tailwind CSS          |
| Blockchain | Solidity (Smart Contracts on EVM)  |
| Wallet     | RainbowKit, Wagmi, Viem           |
| Network    | Avalanche C-Chain                  |
| Hosting    | Vercel                             |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ballotdao.git
cd ballotdao
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure WalletConnect (Optional)

For the best experience, get a free project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/):

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project
3. Copy your project ID
4. Update `src/web3/rainbowkit-config.js` with your project ID

### 4. Run the App Locally

```bash
npm run dev
```

The app should be running on http://localhost:5173

---

## 🧪 Smart Contract Deployment

Ensure you have Hardhat or Foundry set up (choose one based on your tool preference)

```bash
# Compile contracts
npx hardhat compile

# Deploy to Avalanche testnet
npx hardhat run scripts/deploy.js --network fuji
```

Update frontend with deployed contract address and ABI

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_CONTRACT_ADDRESS=0xYourSmartContractAddress
VITE_NETWORK=avalanche
```

---

## 🔗 Wallet Support

BallotDAO supports all major wallets through RainbowKit:

- **MetaMask**
- **WalletConnect** (mobile wallets)
- **Coinbase Wallet**
- **Rainbow Wallet**
- **Trust Wallet**
- **And many more...**

---

## 🤝 Contribution

Feel free to fork the repo, create a feature branch, and submit a pull request. We welcome contributions from devs, designers, and DAO enthusiasts!

---

## 📄 License

MIT License © 2025 [Your Name or Team]

---

## ✨ Acknowledgements

- [RainbowKit](https://rainbowkit.com/) - Beautiful wallet connection UI
- [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [Viem](https://viem.sh/) - TypeScript interface for Ethereum
- [OpenZeppelin](https://openzeppelin.com/) - Secure smart contract libraries
- [Avalanche](https://www.avax.network/) - Fast and scalable blockchain
- [Vercel](https://vercel.com/) - Deployment platform


