'use client'
import { ContractFactory, parseEther } from 'ethers'
import {abi, bytecode} from '../constants.json'

export async function deployEscrow(clientAcc:any, signer: any, freelancerAddress: string, amount: number) {
    console.log('deploying contract...')
    if(!clientAcc){
      alert('no wallet connected')
      return;
    }
    try {
        if(freelancerAddress.trim() == ""){
            alert('freelancer\'s address not detected')
        }


        const escrowContractFactory = new ContractFactory(abi, bytecode, signer)
    
        console.log("deploying contract ...")
        const escrow = await escrowContractFactory.deploy(freelancerAddress, {value: parseEther(`${amount}`)})
        await escrow.waitForDeployment();
        console.log('escrow contract deployed successfully on: ', await escrow.getAddress())
    
        const add = await escrow.getAddress()
        return add;
    } catch (error) {
      console.log('error while deploying the contract', error)
    }
}