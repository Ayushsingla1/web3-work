import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from 'ethers'
import { useMemo } from 'react'
import { type Account, type Chain, type Client, type Transport } from 'viem'
import { type Config, useConnectorClient } from 'wagmi'

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  console.log(chain?.id)
  if(chain?.id === 11155111){
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    }
    
    console.log(network)

    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address)
    return signer
  }
  else if(chain?.id === 80002){
    const network = {
      chainId: 80002,
      name: "Polygon Amoy Testnet",
      // ensAddress: chain.contracts?.ensRegistry?.address,
    }
    console.log(network)
    
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address)
    console.log(signer)
    return signer
  }
  else if(chain?.id === 1320){
    console.log(chain)
    const network = {
      chainId: chain.id,
      name: chain.name
    }
    console.log(network)
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address)
    console.log(signer)
    return signer
  }
  else{
    const network = {
      chainId: 5003,
      name: "Mantle Sepolia Testnet",
      // ensAddress: chain.contracts?.ensRegistry?.address,
    }
    console.log(network)
    
    const provider = new BrowserProvider(transport, network);
    const signer = new JsonRpcSigner(provider, account.address)
    console.log(signer)
    return signer
  }

}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client])
}