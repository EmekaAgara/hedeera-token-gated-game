// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// export async function checkGate(address){
//   const res = await fetch(`${API_BASE}/api/check-gate?address=${encodeURIComponent(address)}`)
//   return res.json()
// }

// export async function claimReward(address, score){
//   const res = await fetch(`${API_BASE}/api/claim`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ address, score })
//   })
//   return res.json()
// }

// export async function marketplaceList(){
//   const res = await fetch(`${API_BASE}/api/marketplace/list`)
//   return res.json()
// }

// export async function marketplaceBuy(itemId, buyerAddress){
//   const res = await fetch(`${API_BASE}/api/marketplace/buy`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ itemId, buyerAddress })
//   })
//   return res.json()
// }

// src/utils/hedera.js
// Mock implementations - replace with actual Hedera SDK calls

// Check if user has access (NFT or token balance)
export const checkGate = async (address) => {
  // Mock implementation - replace with actual Hedera mirror node query
  console.log("Checking gate for address:", address);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock: 70% chance of having access
  const hasAccess = Math.random() > 0.3;

  return hasAccess;
};

// Claim rewards after game completion
export const claimRewards = async (address, tokens, nft) => {
  console.log("Claiming rewards:", { address, tokens, nft });

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful claim
  return {
    success: true,
    tokens,
    nft,
    transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
    timestamp: new Date().toISOString(),
  };
};

// Get user's reward history
export const getRewardHistory = async (address) => {
  // Mock implementation
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      tokens: 150,
      nft: true,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      transactionHash: "0xabc123...",
    },
    {
      tokens: 75,
      nft: false,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      transactionHash: "0xdef456...",
    },
  ];
};

// Get NFTs available in marketplace
export const getNFTsForSale = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: 1,
      name: "Game Access Pass",
      description: "Unlocks full game access and exclusive content",
      price: 50,
      rarity: "Common",
      image: "/api/placeholder/300/300",
      owner: "0x123...abc",
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
      owner: "0x456...def",
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
      owner: "0x789...ghi",
      attributes: [
        { trait_type: "Type", value: "Armor" },
        { trait_type: "Defense", value: "+50" },
        { trait_type: "Resistance", value: "Fire" },
        { trait_type: "Rarity", value: "Epic" },
      ],
    },
  ];
};

// Buy NFT from marketplace
export const buyNFT = async (nftId, price, buyerAddress) => {
  console.log("Buying NFT:", { nftId, price, buyerAddress });

  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock purchase
  return {
    success: true,
    nftId,
    price,
    buyerAddress,
    transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
  };
};

// List NFT for sale
export const listNFTForSale = async (nftId, price, sellerAddress) => {
  console.log("Listing NFT:", { nftId, price, sellerAddress });

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    success: true,
    nftId,
    price,
    sellerAddress,
    listedAt: new Date().toISOString(),
  };
};

// Get user's owned NFTs
export const getUserNFTs = async (address) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock user NFTs
  return [
    {
      id: 4,
      name: "Victory Trophy",
      description: "Awarded for completing the game",
      rarity: "Uncommon",
      image: "/api/placeholder/300/300",
    },
    {
      id: 5,
      name: "Speed Runner Badge",
      description: "Awarded for fast completion time",
      rarity: "Rare",
      image: "/api/placeholder/300/300",
    },
  ];
};

// Get user's token balance
export const getTokenBalance = async (address) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock balance
  return {
    hbar: 1250.5,
    gameTokens: 345,
    nftCount: 2,
  };
};

// Add these functions to src/utils/hedera.js

// Claim jackpot reward
export const claimJackpotReward = async (address, amount) => {
  console.log("Claiming jackpot reward:", { address, amount });

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Mock successful claim
  return {
    success: true,
    amount,
    transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
    timestamp: new Date().toISOString(),
  };
};

// Mint jackpot NFT
export const mintJackpotNFT = async (address, rareItem) => {
  console.log("Minting jackpot NFT:", { address, rareItem });

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock successful mint
  return {
    success: true,
    nftName: `Legendary ${rareItem}`,
    nftId: Math.floor(Math.random() * 10000),
    transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
    timestamp: new Date().toISOString(),
  };
};
