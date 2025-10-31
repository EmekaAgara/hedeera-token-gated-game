// src/pages/Game.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import { useWallet } from "../hooks/useWallet"; // Updated import

export default function Game() {
  const navigate = useNavigate();
  const { isConnected, isHederaNetwork } = useWallet(); // Updated hook
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // Demo timer
  const [score, setScore] = useState(0);

  // Redirect if not properly connected
  useEffect(() => {
    if (!isConnected || !isHederaNetwork) {
      navigate("/");
    }
  }, [isConnected, isHederaNetwork, navigate]);

  // Demo game timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        // Increase score randomly
        setScore((prev) => prev + Math.floor(Math.random() * 100));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gameStarted && timeLeft === 0) {
      // Game completed
      navigate("/claim", { state: { score } });
    }
  }, [gameStarted, timeLeft, score, navigate]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(120);
    setScore(0);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-effect rounded-3xl p-8 text-center max-w-md"
        >
          <h1 className="text-4xl font-bold mb-4 text-hedera-green">
            Ready to Play?
          </h1>
          <p className="text-gray-300 mb-6">
            Complete the game to earn tokens and NFTs! Your performance
            determines your rewards.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-gradient-to-r from-hedera-purple to-hedera-green px-8 py-3 rounded-xl font-semibold text-lg"
          >
            Start Game
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Game Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center glass-effect rounded-2xl p-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-hedera-green">
              Hedera Adventure
            </h1>
            <p className="text-sm text-gray-400">
              Play to earn tokens and NFTs
            </p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">Score: {score}</div>
            <div className="text-sm text-gray-400">Time: {timeLeft}s</div>
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden">
        <Spline
          scene="https://prod.spline.design/McDr7XcMywwgdhNt/scene.splinecode"
          onLoad={(spline) => {
            console.log("Game loaded successfully", spline);
          }}
          onError={(error) => {
            console.error("Failed to load game:", error);
          }}
        />

        {/* Game Overlay */}
        <div className="absolute top-4 left-4 glass-effect rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-hedera-green rounded-full animate-pulse" />
            <span className="text-sm">Playing...</span>
          </div>
        </div>
      </div>

      {/* Game Instructions */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold mb-2">How to Play</h3>
          <p className="text-gray-400 text-sm">
            Navigate through the 3D environment. Complete objectives to earn
            points. Higher scores yield better rewards!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
