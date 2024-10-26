import { MyContext } from "@/components/Context";
import { clientApproval, freelancerApproval } from "@/contracts/EscrowMethods/methods";
import { useEthersSigner } from "@/contracts/providerChange";
import React, { useContext, useEffect } from "react";
import { useAccount } from "wagmi";


const ApprovalBtn = ({approvalProps, escrowAddress}:any) => {


    const address = approvalProps.contractAddress;
    const tempAddress = "0x8fdf21b63746c0a6a7cc37050ece02a1588d736b"
    const {findUser, getProfile} = useContext(MyContext)
    const connectedAccount = useAccount();
    const signer = useEthersSigner({chainId: connectedAccount.chainId});
    let myId:string = ""; 

    const fetchUser = async() => {
        const userRes = await findUser();
        const myProfile = await getProfile(userRes.email);
        return myProfile;
    }

    useEffect(() => {
       
    }, [])

    const approve = async () => {
        console.log("approving");
        await fetchUser().then((res) => {
            myId = res.data().id;
        })
        if(approvalProps.client === myId){
            //client approval logic
            console.log("signer", signer)
            console.log("address:", tempAddress)
            const res = await clientApproval(tempAddress, signer);
            res ? console.log('approved') : console.log("not approved");
        }else{
            //freelancer approval logic
            console.log("hi I am a freelancer")
            const res = await freelancerApproval(tempAddress, signer);
            res ? console.log('approved') : console.log("not approved");
        }
    }

    return ( 
        <button className={`${address !== "" ? "hidden" : "block"} ${connectedAccount ? "block" : "hidden"} text-lg px-2 py-1 bg-[#6581A6] rounded-lg hover:bg-[#4f6f9a] active:bg-[#304969]`} onClick={approve}>
            Approve
        </button>
     );
}
 
export default ApprovalBtn;