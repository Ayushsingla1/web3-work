import { Contract, formatEther } from 'ethers';
import {abi} from '../constants.json'

export const fetchAmount = async (contractAddress: string, signer:any, clientAcc: any) => {
    const contractSigned = new Contract(contractAddress, abi, signer);
    if (contractSigned) {
        try {
            const EscrowAmount = await contractSigned.amount();
            console.log(formatEther(EscrowAmount), "ETH")
        } catch (error) {
            console.error("Error fetching the amount:", error);
        }
    } else {
        alert("Contract not loaded yet. Connect to wallet first.");
    }
};

export const releaseFunds = async (contractAddress: string, signer: any, clientAcc:any) => {
    const contractSigned = new Contract(contractAddress, abi, signer);
    if (contractSigned) {
        try {
            const clientApp = await contractSigned.clientApproval();
            const freelancerApp = await contractSigned.freelancerApproval();
            console.log('client: ', clientApp)
            console.log('feelancer: ', freelancerApp)
            if(clientApp && freelancerApp){
              const releaseFunds = await contractSigned.releaseFundsIfApproved();
              await releaseFunds.wait();
              console.log(releaseFunds)
            }
        } catch (error) {
            console.error("Error while releasing funds:", error);
        }
    } else {
        alert("Contract not loaded yet. Connect to wallet first.");
    }
}


export const clientApproval = async (contractAddress: string, signer: any) => {
  const contractSigned = new Contract(contractAddress, abi, signer);
  if(contractSigned){
    try {
     const clientApprovalCall = await contractSigned.approveByClient() 
     await clientApprovalCall.wait()
     console.log(clientApprovalCall)
     console.log('client has approved!!');
    } catch (error) {
      console.log('error while approving by client', error)
    }
  } 
  else{
    alert("conract not loaded yet. Connect to wallet first");
  }
}

export const freelancerApproval = async(contractAddress:string, signer:any) => {
  const contractSigned = new Contract(contractAddress, abi, signer);
  if(contractSigned){
    try {
     const freelancerApprovalCall = await contractSigned.approveByFreelancer() 
     await freelancerApprovalCall.wait()
     console.log(freelancerApprovalCall)
     console.log('freelancer has approved!!');
    } catch (error) {
      console.log('error while approving by client', error)
    }
  } 
  else{
    alert("conract not loaded yet. Connect to wallet first");
  }

}