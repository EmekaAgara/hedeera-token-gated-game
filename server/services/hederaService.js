// server/services/hederaService.js
import {
  AccountId,
  PrivateKey,
  Client,
  TokenCreateTransaction,
  TokenMintTransaction,
  TransferTransaction,
  AccountBalanceQuery,
  TokenAssociateTransaction,
  TokenInfoQuery,
  Hbar,
} from "@hashgraph/sdk";

export default class HederaService {
  constructor(config) {
    this.operatorId = AccountId.fromString(config.OPERATOR_ID);
    this.operatorKey = PrivateKey.fromString(config.OPERATOR_KEY);
    this.network = config.NETWORK;

    this.client = Client.forName(this.network);
    this.client.setOperator(this.operatorId, this.operatorKey);

    // Token IDs (replace with your actual token IDs)
    this.ACCESS_NFT_TOKEN_ID = process.env.ACCESS_NFT_TOKEN_ID || "0.0.1234567";
    this.GAME_TOKEN_ID = process.env.GAME_TOKEN_ID || "0.0.1234568";
    this.REWARD_NFT_TOKEN_ID = process.env.REWARD_NFT_TOKEN_ID || "0.0.1234569";
  }

  // Check if user has access (holds access NFT or sufficient tokens)
  async checkGateAccess(address) {
    try {
      // Convert EVM address to Hedera account ID if needed
      const accountId = this.evmAddressToAccountId(address);

      // Check token balance
      const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);

      const balance = await balanceQuery.execute(this.client);

      // Check if user holds the access NFT
      const hasAccessNFT = balance.tokens?._map.has(this.ACCESS_NFT_TOKEN_ID);

      // Check if user has sufficient game tokens
      const gameTokenBalance =
        balance.tokens?._map.get(this.GAME_TOKEN_ID) || 0;
      const hasSufficientTokens = gameTokenBalance >= 100; // Minimum 100 tokens

      return hasAccessNFT || hasSufficientTokens;
    } catch (error) {
      console.error("Error checking gate access:", error);
      throw new Error(`Failed to check access: ${error.message}`);
    }
  }

  // Process rewards after game completion
  async processRewards(address, score) {
    try {
      const accountId = this.evmAddressToAccountId(address);

      // Calculate rewards based on score
      const baseTokens = Math.floor(score / 10);
      const bonusNFT = score >= 1000;
      const multiplier = score >= 800 ? 2 : score >= 500 ? 1.5 : 1;
      const totalTokens = Math.floor(baseTokens * multiplier);

      const results = {
        tokensAwarded: totalTokens,
        nftAwarded: bonusNFT,
        multiplierApplied: multiplier,
        score,
      };

      // Mint tokens to user
      if (totalTokens > 0) {
        const tokenMintTx = new TokenMintTransaction()
          .setTokenId(this.GAME_TOKEN_ID)
          .setAmount(totalTokens);

        const tokenMintSubmit = await tokenMintTx.execute(this.client);
        await tokenMintSubmit.getReceipt(this.client);

        results.tokenTransactionId = tokenMintSubmit.transactionId.toString();
      }

      // Mint NFT if earned
      if (bonusNFT) {
        const nftMintTx = new TokenMintTransaction()
          .setTokenId(this.REWARD_NFT_TOKEN_ID)
          .setMetadata([Buffer.from(`Reward NFT for score: ${score}`)]);

        const nftMintSubmit = await nftMintTx.execute(this.client);
        const nftMintReceipt = await nftMintSubmit.getReceipt(this.client);

        results.nftTransactionId = nftMintSubmit.transactionId.toString();
        results.nftSerial = nftMintReceipt.serials[0]?.toString();
      }

      return results;
    } catch (error) {
      console.error("Error processing rewards:", error);
      throw new Error(`Failed to process rewards: ${error.message}`);
    }
  }

  // Get NFTs available in marketplace
  async getMarketplaceNFTs() {
    // This would typically query a database or smart contract
    // For now, return mock data
    return [
      {
        id: 1,
        tokenId: this.ACCESS_NFT_TOKEN_ID,
        serial: 1,
        name: "Game Access Pass",
        description: "Unlocks full game access",
        price: 50, // HBAR
        seller: "0.0.1234",
        metadata: {
          image: "ipfs://Qm...",
          attributes: [
            { trait_type: "Type", value: "Access" },
            { trait_type: "Rarity", value: "Common" },
          ],
        },
      },
      {
        id: 2,
        tokenId: this.REWARD_NFT_TOKEN_ID,
        serial: 1,
        name: "Legendary Sword",
        description: "Rare weapon NFT",
        price: 200, // HBAR
        seller: "0.0.5678",
        metadata: {
          image: "ipfs://Qm...",
          attributes: [
            { trait_type: "Type", value: "Weapon" },
            { trait_type: "Rarity", value: "Rare" },
            { trait_type: "Damage", value: "+25" },
          ],
        },
      },
    ];
  }

  // Buy NFT from marketplace
  async buyNFT(nftId, buyerAddress, price) {
    try {
      const buyerAccountId = this.evmAddressToAccountId(buyerAddress);

      // In a real implementation, this would:
      // 1. Verify the NFT is for sale
      // 2. Transfer HBAR from buyer to seller
      // 3. Transfer NFT from seller to buyer
      // 4. Update marketplace listing

      const transferTx = new TransferTransaction()
        .addTokenTransfer(this.ACCESS_NFT_TOKEN_ID, this.operatorId, -1) // From treasury
        .addTokenTransfer(this.ACCESS_NFT_TOKEN_ID, buyerAccountId, 1) // To buyer
        .addHbarTransfer(buyerAccountId, new Hbar(-price)) // From buyer
        .addHbarTransfer(this.operatorId, new Hbar(price)); // To treasury/seller

      const transferSubmit = await transferTx.execute(this.client);
      const transferReceipt = await transferSubmit.getReceipt(this.client);

      return {
        transactionId: transferSubmit.transactionId.toString(),
        nftId,
        price,
        buyer: buyerAddress,
        status: transferReceipt.status.toString(),
      };
    } catch (error) {
      console.error("Error buying NFT:", error);
      throw new Error(`Failed to buy NFT: ${error.message}`);
    }
  }

  // Get user's owned NFTs
  async getUserNFTs(address) {
    try {
      const accountId = this.evmAddressToAccountId(address);
      const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
      const balance = await balanceQuery.execute(this.client);

      const nfts = [];

      // Check for access NFT
      if (balance.tokens?._map.has(this.ACCESS_NFT_TOKEN_ID)) {
        nfts.push({
          tokenId: this.ACCESS_NFT_TOKEN_ID,
          name: "Game Access Pass",
          description: "Unlocks full game access",
          balance: balance.tokens._map.get(this.ACCESS_NFT_TOKEN_ID),
        });
      }

      // Check for reward NFTs
      if (balance.tokens?._map.has(this.REWARD_NFT_TOKEN_ID)) {
        nfts.push({
          tokenId: this.REWARD_NFT_TOKEN_ID,
          name: "Reward NFT",
          description: "Earned through gameplay",
          balance: balance.tokens._map.get(this.REWARD_NFT_TOKEN_ID),
        });
      }

      return nfts;
    } catch (error) {
      console.error("Error getting user NFTs:", error);
      throw new Error(`Failed to get user NFTs: ${error.message}`);
    }
  }

  // Get user balance
  async getUserBalance(address) {
    try {
      const accountId = this.evmAddressToAccountId(address);
      const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);
      const balance = await balanceQuery.execute(this.client);

      return {
        hbar: balance.hbars.toString(),
        gameTokens: balance.tokens?._map.get(this.GAME_TOKEN_ID) || 0,
        accessNFTs: balance.tokens?._map.get(this.ACCESS_NFT_TOKEN_ID) || 0,
        rewardNFTs: balance.tokens?._map.get(this.REWARD_NFT_TOKEN_ID) || 0,
      };
    } catch (error) {
      console.error("Error getting user balance:", error);
      throw new Error(`Failed to get user balance: ${error.message}`);
    }
  }

  // Utility function to convert EVM address to Hedera account ID
  evmAddressToAccountId(evmAddress) {
    // Remove '0x' prefix if present
    const cleanAddress = evmAddress.replace("0x", "");

    // This is a simplified conversion
    // In production, you'd use proper EVM address to Hedera account ID conversion
    return AccountId.fromString(
      `0.0.${parseInt(cleanAddress.slice(0, 8), 16)}`
    );
  }
}
