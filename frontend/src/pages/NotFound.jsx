import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl md:text-9xl font-bold text-hedera-green mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-hedera-purple to-hedera-green px-6 py-3 rounded-xl font-semibold"
          >
            Return Home
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
