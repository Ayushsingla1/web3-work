'use client'
import { MyContext } from "@/components/Context";
import Image from "next/image";
import { useContext } from "react";

export default function DeployContractDropDown(){
    const {setShowContractDropDown} = useContext(MyContext);

    const showDropdown = () => {
        setShowContractDropDown((prev:boolean) => !prev);
    }

    return(
        <div className="border min-w-[205px] flex gap-x-2 py-2 px-4 border-white bg-none rounded-lg font-['Hammersmith_One'] text-[#BDD9F2] text-xl">
            <span>Deploy Escrow</span>
            <Image alt=">" src={'/images/arrowDown.svg'} onClick={showDropdown} height={25} width={25}/>
        </div>
    )
}

