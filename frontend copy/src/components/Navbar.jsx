// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import WalletButton from "./WalletButton";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/game", label: "Game" },
    { path: "/marketplace", label: "Marketplace" },
  ];

  return (
    <nav className="w-full glass-effect border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-hedera-purple to-hedera-green rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-hedera-purple to-hedera-green bg-clip-text text-transparent">
                Hedera Game
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-2 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "text-hedera-green"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-hedera-green/10 rounded-lg border border-hedera-green/20"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Wallet Connection */}
          <WalletButton />
        </div>
      </div>
    </nav>
  );
}
