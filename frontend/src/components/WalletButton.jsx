import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineLogout,
  HiSwitchHorizontal,
  HiExclamationCircle,
  HiLink,
} from "react-icons/hi";
import { useWallet } from "../hooks/useWallet";
import { HiWallet } from "react-icons/hi2";

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
    isConnecting,
  } = useWallet();

  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      // You could add a toast notification here
      setShowOptions(false);
    }
  };

  if (isConnected) {
    return (
      <div className="relative" ref={dropdownRef}>
        {/* Connected Wallet Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowOptions(!showOptions)}
          className="group relative bg-indigo-700 px-4 py-2.5 rounded border border-indigo-500/30 hover:border-ingido-500/50 transition-all duration-200 backdrop-blur-sm min-w-[160px]"
        >
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-2 min-w-0">
              {/* Network Status Dot */}
              <div className="relative">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isHederaNetwork
                      ? "bg-green-500 shadow-lg animate-pulse shadow--green-500/25"
                      : isSupportedNetwork
                      ? "bg-blue-500 shadow-lg shadow-blue-500/25"
                      : "bg-red-500 shadow-lg shadow-red-500/25"
                  }`}
                />
                <div
                  className={`absolute inset-0 rounded-full animate-ping ${
                    isHederaNetwork
                      ? "bg-hedera-green"
                      : isSupportedNetwork
                      ? "bg-blue-500"
                      : "bg-red-500"
                  } opacity-40`}
                />
              </div>

              {/* Address */}
              <span className="text-xs font-medium text-white truncate">
                {formattedAddress}
              </span>
            </div>

            {/* Dropdown Arrow */}
            <motion.div
              animate={{ rotate: showOptions ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-400 group-hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
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
            </motion.div>
          </div>

          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-green-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-72 bg-black rounded-2xl border border-gray-700/50 p-3 z-50 shadow-xl backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex items-center space-x-3 p-2 mb-2">
                <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
                  <HiWallet className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 truncate">
                    {formattedAddress}
                  </p>
                  <div className="flex items-center space-x-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isHederaNetwork
                          ? "bg-green-500"
                          : isSupportedNetwork
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }`}
                    />
                    <p
                      className={`text-xs ${
                        isHederaNetwork
                          ? "text-hedera-green"
                          : isSupportedNetwork
                          ? "text-blue-400"
                          : "text-red-400"
                      }`}
                    >
                      {isHederaNetwork
                        ? "Hedera Testnet"
                        : isSupportedNetwork
                        ? "Connected"
                        : "Unsupported Network"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                {/* Copy Address */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCopyAddress}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  <HiLink className="w-4 h-4" />
                  <span>Copy Address</span>
                </motion.button>

                {/* Network Actions */}
                {!isHederaNetwork && isSupportedNetwork && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      switchToHedera().catch((error) => {
                        alert(`Failed to switch network: ${error.message}`);
                      });
                      setShowOptions(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-yellow-500 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                  >
                    <HiSwitchHorizontal className="w-4 h-4" />
                    <span>Switch to Hedera</span>
                  </motion.button>
                )}

                {!isSupportedNetwork && (
                  <div className="flex items-center space-x-3 px-3 py-2 text-sm text-red-400 bg-red-500/10 rounded-lg">
                    <HiExclamationCircle className="w-4 h-4" />
                    <span>Unsupported Network</span>
                  </div>
                )}

                {/* Disconnect */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    disconnect();
                    setShowOptions(false);
                  }}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                  <HiOutlineLogout className="w-4 h-4" />
                  <span>Disconnect Wallet</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={connect}
      disabled={isConnecting}
      className="group relative bg-indigo-700 px-6 py-3 rounded font-semibold text-white shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-hedera-purple to-hedera-green" />
      <div className="absolute inset-0 bg-gradient-to-r from-hedera-purple/80 to-hedera-green/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      {/* Content */}
      <div className="relative flex items-center justify-center space-x-2">
        {isConnecting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Connecting...</span>
          </>
        ) : (
          <>
            <HiWallet className="w-4 h-4" />
            <span className="text-sm">Connect Wallet</span>
          </>
        )}
      </div>

      {/* Hidden AppKit Button */}
      <appkit-button className="hidden" />
    </motion.button>
  );
}
