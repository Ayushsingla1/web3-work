"use client"
import { createConfig, WagmiProvider , http } from "wagmi";
import { mainnet , sepolia, polygonAmoy } from "wagmi/chains";
import React from "react";
import { AIAtestnet } from "@/app/chainConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
    chains : [mainnet,sepolia, polygonAmoy, AIAtestnet],
    connectors : [
    ],
    transports : {
        [mainnet.id] : http(),
        [sepolia.id] : http(),
        [polygonAmoy.id] : http(),
        [AIAtestnet.id] : http("https://aia-dataseed1-testnet.aiachain.org")
    }
})

const Wallet = ({children} : {children : React.ReactNode}) => {
    const queryclient = new QueryClient();
    
    return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryclient}>
        {children}
    </QueryClientProvider>
    </WagmiProvider>
    )
}

export default Wallet;