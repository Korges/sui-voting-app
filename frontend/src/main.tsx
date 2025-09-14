import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen"; 

import "./index.css";
import '@mysten/dapp-kit/dist/index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig } from "./config/networkConfig.ts";

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={getNetwork()}>
        <WalletProvider autoConnect>
          <RouterProvider router={router}/>
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
