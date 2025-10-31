// src/utils/constants.js
export const HEDERA_NETWORKS = {
  TESTNET: {
    chainId: "0x128", // 296
    chainName: "Hedera Testnet",
    rpcUrls: ["https://testnet.hashio.io/api"],
    blockExplorerUrls: ["https://hashscan.io/testnet"],
    nativeCurrency: {
      name: "HBAR",
      symbol: "HBAR",
      decimals: 18,
    },
  },
  MAINNET: {
    chainId: "0x127", // 295
    chainName: "Hedera Mainnet",
    rpcUrls: ["https://mainnet.hashio.io/api"],
    blockExplorerUrls: ["https://hashscan.io/"],
    nativeCurrency: {
      name: "HBAR",
      symbol: "HBAR",
      decimals: 18,
    },
  },
};

export const GAME_CONFIG = {
  ACCESS_NFT_TOKEN_ID: "0.0.1234567",
  GAME_TOKEN_ID: "0.0.1234568",
  MIN_TOKEN_BALANCE: 100,
  REWARD_RATES: {
    BASE_TOKENS_PER_POINT: 0.1,
    BONUS_THRESHOLDS: {
      NFT: 1000,
      DOUBLE_MULTIPLIER: 800,
      BONUS_MULTIPLIER: 500,
    },
  },
};

export const API_ENDPOINTS = {
  CHECK_GATE: "/api/check-gate",
  CLAIM_REWARDS: "/api/claim",
  MARKETPLACE_LIST: "/api/marketplace/list",
  MARKETPLACE_BUY: "/api/marketplace/buy",
  USER_NFTS: "/api/user/nfts",
  USER_BALANCE: "/api/user/balance",
};
