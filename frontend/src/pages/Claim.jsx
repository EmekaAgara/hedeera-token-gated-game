// src/pages/Claim.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWallet } from "../hooks/useWallet"; // Updated import
import { claimRewards, getRewardHistory } from "../utils/hedera";

export default function Claim() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { address, isConnected } = useWallet(); // Updated hook
  const [score] = useState(state?.score || 0);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimedRewards, setClaimedRewards] = useState([]);
  const [recentClaim, setRecentClaim] = useState(null);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
      return;
    }
    loadRewardHistory();
  }, [address, isConnected, navigate]);

  const loadRewardHistory = async () => {
    if (!address) return;
    try {
      const history = await getRewardHistory(address);
      setClaimedRewards(history);
    } catch (error) {
      console.error("Failed to load reward history:", error);
    }
  };

  const calculateRewards = () => {
    const baseTokens = Math.floor(score / 10);
    const bonusNFT = score >= 1000;
    const multiplier = score >= 800 ? 2 : score >= 500 ? 1.5 : 1;
    const totalTokens = Math.floor(baseTokens * multiplier);

    return {
      tokens: totalTokens,
      nft: bonusNFT,
      multiplier,
      message: getRewardMessage(score),
    };
  };

  const getRewardMessage = (score) => {
    if (score >= 1000) return "Amazing! You earned a legendary NFT!";
    if (score >= 800) return "Excellent! Double token multiplier!";
    if (score >= 500) return "Great job! 1.5x token multiplier!";
    return "Good effort! Keep playing to earn more!";
  };

  const handleClaim = async () => {
    if (!address) return;

    setIsClaiming(true);
    try {
      const rewards = calculateRewards();
      const claimResult = await claimRewards(
        address,
        rewards.tokens,
        rewards.nft
      );

      setRecentClaim({
        ...rewards,
        transactionHash: claimResult.transactionHash,
        timestamp: new Date().toISOString(),
      });

      // Reload history
      await loadRewardHistory();
    } catch (error) {
      console.error("Claim failed:", error);
      alert("Failed to claim rewards. Please try again.");
    } finally {
      setIsClaiming(false);
    }
  };

  const rewards = calculateRewards();

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-hedera-green">
            Claim Your Rewards
          </h1>
          <p className="text-gray-400">
            Congratulations on completing the game!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rewards Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-hedera-green">
              Game Results
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Final Score</span>
                <span className="text-2xl font-bold text-hedera-green">
                  {score}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">Tokens Earned</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-yellow-500">
                    {rewards.tokens}
                  </span>
                  {rewards.multiplier > 1 && (
                    <span className="text-sm text-green-400 ml-2">
                      ({rewards.multiplier}x multiplier)
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                <span className="text-gray-300">NFT Reward</span>
                <span
                  className={`text-lg font-bold ${
                    rewards.nft ? "text-hedera-purple" : "text-gray-500"
                  }`}
                >
                  {rewards.nft ? "Legendary NFT Unlocked!" : "Not Achieved"}
                </span>
              </div>
            </div>

            <div className="p-4 bg-hedera-green/10 border border-hedera-green/30 rounded-lg mb-6">
              <p className="text-hedera-green text-center">{rewards.message}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClaim}
              disabled={isClaiming}
              className="w-full bg-gradient-to-r from-hedera-purple to-hedera-green py-4 rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClaiming ? "Claiming..." : "Claim Rewards"}
            </motion.button>
          </motion.div>

          {/* Recent Claim & History */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Recent Claim */}
            {recentClaim && (
              <div className="glass-effect rounded-2xl p-6 border border-hedera-green/30">
                <h3 className="text-xl font-bold mb-4 text-hedera-green">
                  Recent Claim
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Tokens:</span>
                    <span className="text-yellow-500 font-semibold">
                      {recentClaim.tokens}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">NFT:</span>
                    <span
                      className={
                        recentClaim.nft
                          ? "text-hedera-purple font-semibold"
                          : "text-gray-500"
                      }
                    >
                      {recentClaim.nft ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status:</span>
                    <span className="text-green-400 font-semibold">
                      Confirmed
                    </span>
                  </div>
                  {recentClaim.transactionHash && (
                    <div className="text-xs text-gray-400 break-all">
                      TX: {recentClaim.transactionHash.slice(0, 20)}...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reward History */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-hedera-green">
                Reward History
              </h3>
              {claimedRewards.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {claimedRewards.map((reward, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">
                          {reward.tokens} Tokens
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(reward.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      {reward.nft && (
                        <div className="text-hedera-purple text-sm font-semibold">
                          + NFT
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4">
                  No rewards claimed yet
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/game")}
                className="flex-1 py-3 border border-hedera-purple text-hedera-purple hover:bg-hedera-purple hover:text-white rounded-xl font-semibold transition-all"
              >
                Play Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/marketplace")}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold transition-all"
              >
                Visit Marketplace
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
