// // src/contexts/AppKitProvider.jsx
// import { createAppKit } from "@reown/appkit/react";
// import { WagmiProvider } from "wagmi";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
// import { mainnet, arbitrum } from "@reown/appkit/networks";

// // 0. Setup queryClient
// const queryClient = new QueryClient();

// // 1. Get projectId from https://dashboard.reown.com
// const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID || "demo-project-id";

// // 2. Create custom Hedera network
// const hederaTestnet = {
//   id: 296,
//   name: "Hedera Testnet",
//   currency: "HBAR",
//   explorerUrl: "https://hashscan.io/testnet",
//   rpcUrl: "https://testnet.hashio.io/api",
// };

// const hederaMainnet = {
//   id: 295,
//   name: "Hedera Mainnet",
//   currency: "HBAR",
//   explorerUrl: "https://hashscan.io",
//   rpcUrl: "https://mainnet.hashio.io/api",
// };

// // 3. Set the networks
// const networks = [mainnet, arbitrum, hederaTestnet, hederaMainnet];

// // 4. Create Wagmi Adapter
// const wagmiAdapter = new WagmiAdapter({
//   networks,
//   projectId,
//   ssr: false,
// });

// // 5. Create AppKit modal
// createAppKit({
//   adapters: [wagmiAdapter],
//   networks,
//   projectId,
//   metadata: {
//     name: "Hedera Game",
//     description: "NFT Token Gated Game on Hedera",
//     url:
//       typeof window !== "undefined"
//         ? window.location.origin
//         : "https://localhost:3000",
//     icons: ["https://avatars.githubusercontent.com/u/37784886"],
//   },
//   features: {
//     analytics: true,
//   },
//   themeVariables: {
//     "--w3m-accent": "#6F42C1",
//     "--w3m-color-mix": "#00C389",
//     "--w3m-color-mix-strength": 40,
//   },
// });

// export function AppKitProvider({ children }) {
//   return (
//     <WagmiProvider config={wagmiAdapter.wagmiConfig}>
//       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// src/contexts/AppKitProvider.jsx
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://dashboard.reown.com
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID || "demo-project-id";

// 2. Create custom Hedera network
const hederaTestnet = {
  id: 296,
  name: "Hedera Testnet",
  currency: "HBAR",
  explorerUrl: "https://hashscan.io/testnet",
  rpcUrl: "https://testnet.hashio.io/api",
};

const hederaMainnet = {
  id: 295,
  name: "Hedera Mainnet",
  currency: "HBAR",
  explorerUrl: "https://hashscan.io",
  rpcUrl: "https://mainnet.hashio.io/api",
};

// 3. Set the networks
const networks = [mainnet, arbitrum, hederaTestnet, hederaMainnet];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: false,
});

// 5. Create AppKit modal with custom theme
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: "Hedera Game",
    description: "NFT Token Gated Game on Hedera",
    url:
      typeof window !== "undefined"
        ? window.location.origin
        : "https://localhost:3000",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
  features: {
    analytics: true,
  },
  themeVariables: {
    // "--w3m-accent": "#6F42C1", // Hedera purple
    // "--w3m-color-mix": "#00C389", // Hedera green
    // "--w3m-color-mix-strength": 20,
    // "--w3m-font-family": "Inter, sans-serif",
    // "--w3m-border-radius-master": "12px",
    // "--w3m-background-color": "#0A0A0A",
    // "--w3m-overlay-background-color": "rgba(10, 10, 10, 0.8)",
    // "--w3m-container-border-radius": "20px",
  },
  themeMode: "dark",
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
