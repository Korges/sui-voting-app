import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig } from "./config/networkConfig.ts";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={getNetwork()}>
        <WalletProvider autoConnect>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </StrictMode>,
);

function getNetwork() {
  const networks = ["localnet", "devnet", "testnet"];
  const network = import.meta.env.VITE_NETWORK;

  console.log("Selecting: " + network);

  if (!networks.includes(network)) {
    return "testnet";
  }

  return network;
}
