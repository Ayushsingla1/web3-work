"use client"
import { createConfig, WagmiProvider , http } from "wagmi";
import { mainnet , sepolia, polygonAmoy } from "wagmi/chains";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const config = createConfig({
    chains : [mainnet,sepolia, polygonAmoy],
    connectors : [
    ],
    transports : {
        [mainnet.id] : http(),
        [sepolia.id] : http(),
        [polygonAmoy.id] : http()
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