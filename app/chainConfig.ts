import { defineChain } from "viem"

export const AIAtestnet = /*#__PURE__*/ defineChain({
    id: 1320,
    name: 'AIA Testnet',
    nativeCurrency: { name: 'AIA', symbol: 'AIA', decimals: 18 },
    rpcUrls: {
      default: {
        http: ['https://aia-dataseed1-testnet.aiachain.org'],
    },
    },
    blockExplorers: {
      default: {
        name: 'aiascan',
        url: 'https://testnet.aiascan.com/',
        apiUrl: 'https://testnet.aiascan.com/api', // change this to aia test net apiUrl
      },
    },
    testnet: true,
  })

// export const AIAmainnet = /*#__PURE__*/ defineChain({
//     id: 1_319,
//     name: 'AIA Official Network',
//     nativeCurrency: { name: 'AIA', symbol: 'AIA', decimals: 18 },
//     rpcUrls: {
//       default: {
//         http: ['https://aia-dataseed1-testnet.aiachain.org'],
//       },
//     },
//     blockExplorers: {
//       default: {
//         name: 'aiascan',
//         url: 'https://testnet.aiascan.com/',
//         apiUrl: 'https://testnet.aiascan.com/api', // change this to aia test net apiUrl
//       },
//     },
//     testnet: true,
//   })
  