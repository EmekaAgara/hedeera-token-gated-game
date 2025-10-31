# 🎮 Play to Earn On XBag 💰

### NFT-Gated Gaming on Hedera — Play, Earn, and Trade in a 3D World

---

## 🚀 Overview

**Play to Earn On XBag** is a next-generation **Web3 play-to-earn gaming experience** built on the **Hedera Testnet**.  
Players connect their wallet to access an immersive 3D game world, earn tokens and NFTs through gameplay, and trade assets seamlessly in the integrated marketplace.

Access is controlled via **NFT gating** — only holders of the **Game Access NFT (Token ID: 0.0.1234567)** or those with at least **100 Game Tokens** can enter exclusive areas and earn rewards.

---

## 💡 Problem & Solution

**The Problem:**  
Traditional gaming models lock user assets within centralized platforms. Players invest time and money but never truly own their in-game achievements or items.

**Our Solution:**  
XBag leverages **Hedera Hashgraph’s fast, low-cost, and eco-friendly** blockchain to enable true digital ownership.  
Players can:

- **Own** their in-game items as NFTs
- **Earn** tokens for performance
- **Trade** assets directly with other players

---

## 🧩 Key Features

- **🔐 NFT Gated Access** — Enter exclusive content by holding an NFT or 100 Game Tokens.
- **🎮 Play-to-Earn Rewards** — Skill-based gameplay with token and NFT rewards.
- **💰 Marketplace** — Trade NFTs and tokens with other players securely.
- **🌐 3D Experience** — Immersive game world built with Spline/Three.js.
- **⚡ Hedera-Powered** — Efficient, sustainable blockchain integration.

---

## 🛠️ Tech Stack

| Layer                   | Technology                                                             |
| ----------------------- | ---------------------------------------------------------------------- |
| **Frontend**            | React (Next.js / Vite), Tailwind CSS, Framer Motion, Spline / Three.js |
| **Blockchain**          | Hedera JavaScript SDK, WalletConnect, Hedera Testnet                   |
| **Backend**             | Node.js + Express (for NFT minting & marketplace APIs)                 |
| **Database (optional)** | Supabase / Firestore / MongoDB                                         |
| **Storage**             | IPFS (Pinata / Web3.Storage) for NFT metadata                          |
| **Deployment**          | Vercel / Netlify (frontend), Render / Railway (backend)                |

---

## 🧱 Architecture Overview

```

User → Connect Wallet → Verify Access (NFT / Tokens) → Enter Game
↓
Play Game → Earn Rewards → Mint NFT / Tokens on Hedera
↓
Access Marketplace → Trade Assets with Other Players
↓
Dashboard → View Balances, NFTs, and History

```

---

## 🔧 Setup & Installation

### Prerequisites

- Node.js v18+
- Hedera Testnet account — create one at [portal.hedera.com](https://portal.hedera.com)
- Optional: IPFS account (Pinata / Web3.Storage)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-org>/xbag.git
cd xbag
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Now open your app at: **[http://localhost:3000](http://localhost:3000)**

---

### 3️⃣ Backend Setup (Optional)

```bash
cd ../backend
cp .env.example .env
npm install
npm run dev
```

Your server runs at: **[http://localhost:4000](http://localhost:4000)**

---

### 🧾 Example `.env.example`

```
REACT_APP_HEDERA_NETWORK=testnet
REACT_APP_HEDERA_MIRROR_NODE=https://testnet.mirrornode.hedera.com
REACT_APP_IPFS_GATEWAY=https://ipfs.io/ipfs
HEDERA_OPERATOR_ID=0.0.xxxxx
HEDERA_OPERATOR_KEY=302e0201...
```

---

## 🕹️ How to Play

1. Connect your **Hedera Testnet wallet** (WalletConnect / HashPack).
2. Verify access — hold `0.0.1234567` NFT or ≥100 Game Tokens.
3. Enter the **3D world** and play the mini-game.
4. Earn **tokens and NFTs** based on performance.
5. View earned assets and balances in your dashboard.
6. **Trade** NFTs and tokens in the in-app marketplace.

---

## 📸 Demo Video

🎥 Watch the full demo walkthrough here:
👉 [Demo Video Link](https://youtu.be/your-demo-link)

---

## 📘 Pitch Deck

👉 [Pitch Deck Link](https://your-pitch-deck-link.com)

---

## 🪪 Certification

👉 [Certification Link](https://your-certification-link.com)

---

## 🧭 Roadmap

- [x] Hedera Wallet Connect
- [x] NFT-Gated Access
- [x] Play-to-Earn Rewards
- [x] Marketplace Prototype
- [ ] Leaderboard System
- [ ] Social Trading
- [ ] Gasless Transactions

---

## 🏆 Hackathon Submission

- **Hackathon:** [Enter Hackathon Name]
- **Category:** Web3 / Blockchain / Gaming
- **Network:** Hedera Testnet
- **Game Access NFT ID:** `0.0.1234567`
- **Submission Date:** [Add Date Here]
- **Repository:** [GitHub Repo Link Here]

---

## 🧠 Acknowledgements

- [Hedera Developer Docs](https://docs.hedera.com)
- [WalletConnect](https://walletconnect.com)
- [Spline](https://spline.design) / [Three.js](https://threejs.org)
- [IPFS](https://ipfs.io) for decentralized storage

---

## 🛡️ License

MIT License © 2025 XBag Team

---

> **“Play. Earn. Own. Trade. — XBag brings true ownership to gaming.”**

```

---
```
