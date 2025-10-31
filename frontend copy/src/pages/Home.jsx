// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "../hooks/useWallet";
import { checkGate } from "../utils/hedera";

export default function Home() {
  const { address, isConnected, isHederaNetwork } = useWallet();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [accessStatus, setAccessStatus] = useState(null);

  const handleEnterGame = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!isHederaNetwork) {
      alert("Please switch to Hedera Testnet to play");
      return;
    }

    setLoading(true);
    setAccessStatus(null);

    try {
      const hasAccess = await checkGate(address);

      if (hasAccess) {
        setAccessStatus({
          type: "success",
          message: "Access granted! Entering game...",
        });
        setTimeout(() => navigate("/game"), 1000);
      } else {
        setAccessStatus({
          type: "error",
          message:
            "Access denied. You need a Game Access NFT or sufficient tokens to enter.",
        });
      }
    } catch (error) {
      console.error("Access check failed:", error);
      setAccessStatus({
        type: "error",
        message: "Failed to check access. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-hedera-purple via-hedera-green to-hedera-purple bg-clip-text text-transparent">
              Play to Earn
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Enter the ultimate NFT-gated gaming experience on Hedera. Play, earn
            tokens, and collect unique NFTs in our immersive 3D world.
          </p>
        </motion.div>

        {/* Access Status */}
        {accessStatus && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mb-6 p-4 rounded-xl ${
              accessStatus.type === "success"
                ? "bg-green-500/20 border border-green-500/30"
                : "bg-red-500/20 border border-red-500/30"
            }`}
          >
            <p
              className={
                accessStatus.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {accessStatus.message}
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnterGame}
            disabled={loading || !isConnected}
            className="px-8 py-4 bg-gradient-to-r from-hedera-purple to-hedera-green rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Checking Access..." : "Enter Game"}
          </motion.button>

          <Link to="/marketplace">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-hedera-purple text-hedera-purple hover:bg-hedera-purple hover:text-white rounded-xl font-semibold text-lg transition-all"
            >
              Visit Marketplace
            </motion.div>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            {
              title: "NFT Gated Access",
              description:
                "Hold specific NFTs to access exclusive game content and features",
              icon: "🔐",
            },
            {
              title: "Play to Earn",
              description:
                "Earn tokens and NFTs through gameplay achievements and skill",
              icon: "🎮",
            },
            {
              title: "Marketplace",
              description:
                "Trade, buy, and sell your earned NFTs and tokens with other players",
              icon: "💰",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-effect p-6 rounded-2xl text-center"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-hedera-green">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Requirements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-hedera-green">
            Access Requirements
          </h2>
          <div className="space-y-4 text-left">
            {[
              "Hold Game Access NFT (Token ID: 0.0.1234567)",
              "OR Have minimum 100 Game Tokens",
              "Connected Hedera Testnet Wallet",
              "Wallet must be connected to proceed",
            ].map((requirement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-hedera-green rounded-full" />
                <span className="text-gray-300">{requirement}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
