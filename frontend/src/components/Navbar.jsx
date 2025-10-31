// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiPuzzle,
  HiShoppingCart,
  HiMenu,
  HiX,
  HiSparkles,
} from "react-icons/hi";
import WalletButton from "./WalletButton";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: HiHome },
    { path: "/game", label: "Game", icon: HiPuzzle },
    { path: "/marketplace", label: "Marketplace", icon: HiShoppingCart },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="w-full border-b border-gray-800/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-hedera-purple to-hedera-green rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-hedera-purple/20 transition-all duration-300">
                <HiSparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-hedera-purple to-hedera-green rounded-xl blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">XBag Game</span>
              <span className="text-xs text-gray-400 -mt-1">Play to Earn</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex text-xs items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path} className="relative group">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded transition-all duration-200 ${
                      isActive
                        ? "text-white bg-blue-500/10  border-blue-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {/* <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-hedera-green" : ""
                      }`}
                    /> */}
                    <span className="font-medium">{item.label}</span>
                  </motion.div>

                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Wallet & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Wallet Button - Hidden on mobile */}
            <div className="hidden sm:block">
              <WalletButton />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg bg-black hover:bg-gray-900/50 border border-gray-700/50 transition-colors"
            >
              {mobileMenuOpen ? (
                <HiX className="w-5 h-4 text-gray-300" />
              ) : (
                <HiMenu className="w-5 h-4 text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={toggleMobileMenu}
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-full left-4 right-4 mt-2 bg-black rounded border border-gray-700/50 p-4 z-50 lg:hidden shadow-xl"
              >
                {/* Mobile Navigation Items */}
                <div className="space-y-2 text-xs">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={toggleMobileMenu}
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center space-x-3 p-4 rounded transition-all ${
                            isActive
                              ? "bg-gray-500/10 text-hedera-green border border-gray-500/20"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {/* <Icon className="w-5 h-5" /> */}
                          <span className="font-medium">{item.label}</span>
                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                          )}
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Wallet Button */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <WalletButton />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
