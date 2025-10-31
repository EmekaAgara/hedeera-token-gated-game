// src/pages/Jackpot.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../hooks/useWallet";
import { claimJackpotReward, mintJackpotNFT } from "../utils/hedera";

export default function Jackpot() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { address, isConnected, isHederaNetwork } = useWallet();

  const [hasJackpotAccess, setHasJackpotAccess] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [isSpinning, setIsSpinning] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [claimStatus, setClaimStatus] = useState(null);
  const [jackpotAmount] = useState(state?.jackpotAmount || 5000);
  const [rareItem] = useState(state?.rareItem || "Golden Key");

  // Check if user has legitimate jackpot access
  useEffect(() => {
    const checkAccess = () => {
      // Check if user came from game with valid jackpot data
      const hasValidAccess =
        state?.jackpotAccess === true &&
        state?.rareItem &&
        state?.jackpotAmount > 0;

      setHasJackpotAccess(hasValidAccess);

      // Stop spinning animation after 3 seconds
      const spinTimer = setTimeout(() => {
        setIsSpinning(false);
        setShowConfetti(true);
      }, 3000);

      return () => clearTimeout(spinTimer);
    };

    checkAccess();
  }, [state]);

  // Auto-hide confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(confettiTimer);
    }
  }, [showConfetti]);

  const handleClaimJackpot = async () => {
    if (!isConnected) {
      alert("Please connect your wallet to claim the jackpot!");
      return;
    }

    if (!isHederaNetwork) {
      alert("Please switch to Hedera Testnet to claim your rewards!");
      return;
    }

    setIsClaiming(true);
    setClaimStatus({
      type: "processing",
      message: "Processing your jackpot...",
    });

    try {
      // Claim tokens
      const tokenResult = await claimJackpotReward(address, jackpotAmount);

      // Mint exclusive NFT
      const nftResult = await mintJackpotNFT(address, rareItem);

      setClaimStatus({
        type: "success",
        message: "Jackpot claimed successfully!",
        details: {
          tokens: jackpotAmount,
          nft: rareItem,
          transactionHash: tokenResult.transactionHash,
        },
      });

      // Show success animation
      setShowConfetti(true);
    } catch (error) {
      console.error("Jackpot claim failed:", error);
      setClaimStatus({
        type: "error",
        message: "Failed to claim jackpot. Please try again.",
      });
    } finally {
      setIsClaiming(false);
    }
  };

  // If no valid jackpot access, show access denied message
  if (!hasJackpotAccess) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-3xl p-8 text-center max-w-md"
        >
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold mb-4 text-red-400">
            Access Denied
          </h1>
          <p className="text-gray-300 mb-6">
            You need to find a rare item in the game to access the jackpot!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/game")}
            className="bg-gradient-to-r from-hedera-purple to-hedera-green px-6 py-3 rounded-xl font-semibold"
          >
            Back to Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-hedera-purple/10 via-transparent to-hedera-green/10"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-hedera-green rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
            }}
            animate={{
              y: [null, -100, null],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0,
                  scale: 0,
                }}
                animate={{
                  y: window.innerHeight + 100,
                  rotate: 360,
                  scale: 1,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  ease: "easeOut",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              >
                {["🎉", "🎊", "💰", "🎯", "⭐", "🔥", "💎", "🏆"][i % 8]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              JACKPOT
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            You found the {rareItem}! Claim your massive reward!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Jackpot Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="glass-effect rounded-3xl p-8 border-2 border-yellow-400/30 relative overflow-hidden">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-20 animate-pulse"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">
                  🎰 Mega Jackpot 🎰
                </h2>

                {/* Spinning Slot Animation */}
                <div className="mb-8">
                  <motion.div
                    animate={
                      isSpinning
                        ? {
                            rotate: [0, 360, 720, 1080],
                            scale: [1, 1.1, 1, 1.1],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    className="text-center mb-4"
                  >
                    <div className="text-8xl">💎</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.2, type: "spring" }}
                    className="text-center"
                  >
                    <div className="text-5xl font-bold text-yellow-400 mb-2">
                      {jackpotAmount.toLocaleString()}
                    </div>
                    <div className="text-lg text-gray-300">Game Tokens</div>
                  </motion.div>
                </div>

                {/* Prize Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-400/30">
                    <span className="text-gray-300">Rare Item Found</span>
                    <span className="text-yellow-400 font-semibold text-lg">
                      {rareItem}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-hedera-purple/10 rounded-xl border border-hedera-purple/30">
                    <span className="text-gray-300">Exclusive NFT</span>
                    <span className="text-hedera-purple font-semibold text-lg">
                      Legendary {rareItem} NFT
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-hedera-green/10 rounded-xl border border-hedera-green/30">
                    <span className="text-gray-300">Bonus Multiplier</span>
                    <span className="text-hedera-green font-semibold text-lg">
                      10x
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Claim Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Claim Card */}
            <div className="glass-effect rounded-3xl p-6 border border-hedera-green/30">
              <h3 className="text-2xl font-bold mb-4 text-hedera-green text-center">
                Claim Your Prize
              </h3>

              {/* Status Messages */}
              <AnimatePresence>
                {claimStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl mb-4 ${
                      claimStatus.type === "success"
                        ? "bg-green-500/20 border border-green-500/30"
                        : claimStatus.type === "error"
                        ? "bg-red-500/20 border border-red-500/30"
                        : "bg-blue-500/20 border border-blue-500/30"
                    }`}
                  >
                    <p
                      className={
                        claimStatus.type === "success"
                          ? "text-green-400"
                          : claimStatus.type === "error"
                          ? "text-red-400"
                          : "text-blue-400"
                      }
                    >
                      {claimStatus.message}
                    </p>
                    {claimStatus.details && (
                      <div className="mt-2 text-sm text-gray-300">
                        <div>Tokens: {claimStatus.details.tokens}</div>
                        <div>NFT: {claimStatus.details.nft}</div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Requirements Check */}
              <div className="space-y-3 mb-6">
                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isConnected
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-red-500/10 border border-red-500/20"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span
                    className={isConnected ? "text-green-400" : "text-red-400"}
                  >
                    {isConnected ? "Wallet Connected" : "Connect Wallet"}
                  </span>
                </div>

                <div
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isHederaNetwork
                      ? "bg-green-500/10 border border-green-500/20"
                      : "bg-yellow-500/10 border border-yellow-500/20"
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isHederaNetwork ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <span
                    className={
                      isHederaNetwork ? "text-green-400" : "text-yellow-400"
                    }
                  >
                    {isHederaNetwork ? "Hedera Network" : "Switch to Hedera"}
                  </span>
                </div>
              </div>

              {/* Claim Button */}
              <motion.button
                whileHover={{ scale: isClaiming ? 1 : 1.05 }}
                whileTap={{ scale: isClaiming ? 1 : 0.95 }}
                onClick={handleClaimJackpot}
                disabled={isClaiming || !isConnected || !isHederaNetwork}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 py-4 rounded-xl font-bold text-lg text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
              >
                {isClaiming ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Claiming Jackpot...</span>
                  </div>
                ) : (
                  <>
                    <span>🎯 CLAIM JACKPOT 🎯</span>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] animate-shine" />
                  </>
                )}
              </motion.button>

              {/* Prize Breakdown */}
              <div className="mt-6 p-4 bg-black/30 rounded-xl">
                <h4 className="font-semibold mb-3 text-yellow-400">
                  Prize Breakdown
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Jackpot</span>
                    <span className="text-yellow-400">5,000 Tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rare Item Bonus</span>
                    <span className="text-green-400">+2,500 Tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Exclusive NFT</span>
                    <span className="text-hedera-purple">Legendary Item</span>
                  </div>
                  <div className="border-t border-gray-600 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Value</span>
                      <span className="text-yellow-400">7,500 + NFT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/game")}
                className="py-3 border border-hedera-purple text-hedera-purple hover:bg-hedera-purple hover:text-white rounded-xl font-semibold transition-all"
              >
                Continue Playing
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/marketplace")}
                className="py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-all"
              >
                View Marketplace
              </motion.button>
            </div>

            {/* Celebration Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="text-center p-4 bg-gradient-to-r from-hedera-purple/20 to-hedera-green/20 rounded-xl border border-hedera-green/30"
            >
              <p className="text-hedera-green font-semibold">
                🎉 Congratulations! You're one of the lucky few to find this
                rare item! 🎉
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add shine animation to CSS */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shine {
          animation: shine 2s infinite;
        }
      `}</style>
    </div>
  );
}
