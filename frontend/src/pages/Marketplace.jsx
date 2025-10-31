// src/pages/Marketplace.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "../hooks/useWallet"; // Updated import
import {
  getNFTsForSale,
  buyNFT,
  listNFTForSale,
  getUserNFTs,
} from "../utils/hedera";

export default function Marketplace() {
  const { address, isConnected } = useWallet(); // Updated hook
  const [activeTab, setActiveTab] = useState("buy");
  const [nfts, setNfts] = useState([]);
  const [userNFTs, setUserNFTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    loadMarketplace();
    if (address) {
      loadUserNFTs();
    }
  }, [address]);

  const loadMarketplace = async () => {
    setLoading(true);
    try {
      const marketplaceData = await getNFTsForSale();
      setNfts(marketplaceData);
    } catch (error) {
      console.error("Failed to load marketplace:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserNFTs = async () => {
    try {
      const userNFTsData = await getUserNFTs(address);
      setUserNFTs(userNFTsData);
    } catch (error) {
      console.error("Failed to load user NFTs:", error);
    }
  };

  const handleBuyNFT = async (nft) => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      await buyNFT(nft.id, nft.price, address);
      alert("NFT purchased successfully!");
      await loadMarketplace();
      await loadUserNFTs();
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Failed to purchase NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleListNFT = async (nft, price) => {
    try {
      setLoading(true);
      await listNFTForSale(nft.id, price, address);
      alert("NFT listed for sale successfully!");
      await loadMarketplace();
      await loadUserNFTs();
    } catch (error) {
      console.error("Listing failed:", error);
      alert("Failed to list NFT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const mockNFTs = [
    {
      id: 1,
      name: "Game Access Pass",
      description: "Unlocks full game access and exclusive content",
      price: 50,
      rarity: "Common",
      image: "/api/placeholder/300/300",
      owner: "0x123...",
      attributes: [
        { trait_type: "Type", value: "Access" },
        { trait_type: "Game", value: "Hedera Adventure" },
      ],
    },
    {
      id: 2,
      name: "Legendary Sword",
      description: "Rare weapon with enhanced damage",
      price: 200,
      rarity: "Rare",
      image: "/api/placeholder/300/300",
      owner: "0x456...",
      attributes: [
        { trait_type: "Type", value: "Weapon" },
        { trait_type: "Damage", value: "+25" },
        { trait_type: "Rarity", value: "Rare" },
      ],
    },
    {
      id: 3,
      name: "Dragon Armor Set",
      description: "Epic armor with fire resistance",
      price: 500,
      rarity: "Epic",
      image: "/api/placeholder/300/300",
      owner: "0x789...",
      attributes: [
        { trait_type: "Type", value: "Armor" },
        { trait_type: "Defense", value: "+50" },
        { trait_type: "Resistance", value: "Fire" },
        { trait_type: "Rarity", value: "Epic" },
      ],
    },
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "Common":
        return "text-gray-400";
      case "Uncommon":
        return "text-green-400";
      case "Rare":
        return "text-blue-400";
      case "Epic":
        return "text-purple-400";
      case "Legendary":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-hedera-green">
            NFT Marketplace
          </h1>
          <p className="text-gray-400">Buy, sell, and trade game NFTs</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="glass-effect rounded-2xl p-1 inline-flex">
            {["buy", "sell"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-hedera-purple text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab} NFTs
              </button>
            ))}
          </div>
        </motion.div>

        {activeTab === "buy" ? (
          /* Buy NFTs Tab */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-hedera-green"></div>
                <p className="mt-4 text-gray-400">Loading marketplace...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300"
                  >
                    {/* NFT Image */}
                    <div className="h-48 bg-gradient-to-br from-hedera-purple to-hedera-green relative">
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getRarityColor(
                            nft.rarity
                          )} bg-black/50`}
                        >
                          {nft.rarity}
                        </span>
                      </div>
                    </div>

                    {/* NFT Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">{nft.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {nft.description}
                      </p>

                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-400">Price</p>
                          <p className="font-bold text-hedera-green">
                            {nft.price} HBAR
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Owner</p>
                          <p className="text-xs text-gray-400">{nft.owner}</p>
                        </div>
                      </div>

                      {/* Attributes */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {nft.attributes.slice(0, 2).map((attr, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300"
                          >
                            {attr.value}
                          </span>
                        ))}
                        {nft.attributes.length > 2 && (
                          <span className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                            +{nft.attributes.length - 2} more
                          </span>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleBuyNFT(nft)}
                        disabled={loading}
                        className="w-full bg-hedera-green hover:bg-hedera-purple py-2 rounded-xl font-semibold transition-all disabled:opacity-50"
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {!loading && mockNFTs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-4">
                  No NFTs available for sale
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadMarketplace}
                  className="bg-hedera-purple hover:bg-hedera-green px-6 py-2 rounded-xl font-semibold transition-all"
                >
                  Refresh Marketplace
                </motion.button>
              </div>
            )}
          </motion.div>
        ) : (
          /* Sell NFTs Tab */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {!isConnected ? (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">
                  Connect your wallet to see your NFTs
                </p>
              </div>
            ) : userNFTs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-effect rounded-2xl p-4"
                  >
                    <div className="h-32 bg-gradient-to-br from-hedera-purple to-hedera-green rounded-lg mb-4"></div>
                    <h3 className="font-bold mb-2">{nft.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {nft.description}
                    </p>
                    <button
                      onClick={() => setSelectedNFT(nft)}
                      className="w-full bg-hedera-purple hover:bg-hedera-green py-2 rounded-xl font-semibold transition-all"
                    >
                      List for Sale
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">You don't own any NFTs yet</p>
                <p className="text-gray-500 text-sm">
                  Play the game to earn NFTs!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
