// src/hooks/useWallet.js
import { useAccount, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { useAppKit } from "@reown/appkit/react"; // Correct import

export function useWallet() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { open } = useAppKit(); // Correct hook name

  const connect = async () => {
    await open();
  };

  const switchToHedera = async () => {
    try {
      await switchChain({ chainId: 296 });
    } catch (error) {
      console.error("Failed to switch to Hedera:", error);
      throw error;
    }
  };

  return {
    // State
    address,
    isConnected,
    chainId,
    chain,

    // Methods
    connect,
    disconnect: () => disconnect(),
    switchToHedera,

    // Utility
    formattedAddress: address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : null,
    isHederaNetwork: chainId === 296,
    isSupportedNetwork: [1, 296, 295].includes(chainId),
  };
}
