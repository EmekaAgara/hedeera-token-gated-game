// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import HederaService from "./services/hederaService.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Hedera service
const hederaService = new HederaService({
  OPERATOR_ID: process.env.OPERATOR_ID,
  OPERATOR_KEY: process.env.OPERATOR_KEY,
  NETWORK: process.env.NETWORK || "testnet",
});

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Check if user has access to the game
app.get("/api/check-gate", async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    const hasAccess = await hederaService.checkGateAccess(address);

    res.json({
      allowed: hasAccess,
      address,
      checkedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Gate check error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Claim rewards after game completion
app.post("/api/claim", async (req, res) => {
  try {
    const { address, score } = req.body;

    if (!address || score === undefined) {
      return res.status(400).json({ error: "Address and score are required" });
    }

    const claimResult = await hederaService.processRewards(address, score);

    res.json({
      success: true,
      ...claimResult,
      claimedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Claim error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get marketplace NFTs
app.get("/api/marketplace/list", async (req, res) => {
  try {
    const nfts = await hederaService.getMarketplaceNFTs();
    res.json({ nfts });
  } catch (error) {
    console.error("Marketplace error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Buy NFT from marketplace
app.post("/api/marketplace/buy", async (req, res) => {
  try {
    const { nftId, buyerAddress, price } = req.body;

    if (!nftId || !buyerAddress || !price) {
      return res
        .status(400)
        .json({ error: "NFT ID, buyer address, and price are required" });
    }

    const purchaseResult = await hederaService.buyNFT(
      nftId,
      buyerAddress,
      price
    );

    res.json({
      success: true,
      ...purchaseResult,
    });
  } catch (error) {
    console.error("Buy error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user's NFTs
app.get("/api/user/nfts", async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    const nfts = await hederaService.getUserNFTs(address);

    res.json({ nfts });
  } catch (error) {
    console.error("User NFTs error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get user balance
app.get("/api/user/balance", async (req, res) => {
  try {
    const { address } = req.query;

    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    const balance = await hederaService.getUserBalance(address);

    res.json({ balance });
  } catch (error) {
    console.error("Balance error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
