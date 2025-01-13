"use client"
import '@rainbow-me/rainbowkit/styles.css';
import {
    darkTheme,
    getDefaultConfig,
    RainbowKitProvider,
    Theme,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    sepolia,
    flowTestnet
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import React from 'react';

const config = getDefaultConfig({
    appName: 'GoGetter',
    projectId: "123",
    chains: [sepolia, flowTestnet],
    ssr: true,
});



export const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <WagmiProvider config= { config } >
        <QueryClientProvider client={ queryClient }>
            <RainbowKitProvider theme={darkTheme({borderRadius: 'small',accentColor: '#1d2c40',overlayBlur: 'small',})}>
            { children }
        </RainbowKitProvider>
        </QueryClientProvider>
        </WagmiProvider>
    )
}