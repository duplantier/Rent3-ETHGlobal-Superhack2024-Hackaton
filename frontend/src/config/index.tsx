// config/index.tsx

import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import { mode, modeTestnet } from "wagmi/chains";

// Your WalletConnect Cloud project ID
export const projectId = "b77326a6c281e71e4b4293a86fb61dcc";

// Create a metadata object
const metadata = {
  name: "Apart3",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [mode, modeTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
