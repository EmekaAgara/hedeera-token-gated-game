// src/components/WalletButton.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../hooks/useWallet";

export default function WalletButton() {
  const {
    address,
    isConnected,
    isHederaNetwork,
    isSupportedNetwork,
    connect,
    disconnect,
    switchToHedera,
    formattedAddress,
  } = useWallet();

  const [showOptions, setShowOptions] = useState(false);

  if (isConnected) {
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowOptions(!showOptions)}
          className="glass-effect px-4 py-2 rounded-xl border border-hedera-purple/30 hover:border-hedera-green/50 transition-all min-w-[140px]"
        >
          <div className="flex items-center space-x-2 justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isHederaNetwork
                    ? "bg-hedera-green"
                    : isSupportedNetwork
                    ? "bg-blue-500"
                    : "bg-red-500"
                }`}
              />
              <span className="text-sm font-medium">{formattedAddress}</span>
            </div>
            <svg
              className={`w-4 h-4 transition-transform ${
                showOptions ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </motion.button>

        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-64 glass-effect rounded-xl border border-gray-800 p-2 z-50 shadow-xl"
            >
              {/* Network Status */}
              <div className="px-3 py-2 border-b border-gray-700 mb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Network</span>
                  <span
                    className={`text-sm font-semibold ${
                      isHederaNetwork
                        ? "text-hedera-green"
                        : isSupportedNetwork
                        ? "text-blue-400"
                        : "text-red-400"
                    }`}
                  >
                    {isHederaNetwork ? "Hedera Testnet" : "Other Network"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-1">
                {!isHederaNetwork && isSupportedNetwork && (
                  <button
                    onClick={() => {
                      switchToHedera().catch((error) => {
                        alert(`Failed to switch network: ${error.message}`);
                      });
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <span>🔄</span>
                    <span>Switch to Hedera</span>
                  </button>
                )}

                {!isSupportedNetwork && (
                  <div className="px-3 py-2 text-sm text-red-400 bg-red-500/10 rounded-lg">
                    Unsupported Network
                  </div>
                )}

                <button
                  onClick={() => {
                    disconnect();
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Disconnect</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop to close dropdown when clicking outside */}
        {showOptions && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
        )}
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={connect}
      className="bg-gradient-to-r from-hedera-purple to-hedera-green px-6 py-2 rounded-xl font-semibold min-w-[140px]"
    >
      Connect Wallet
    </motion.button>
  );
}
