'use client'
import DeployContractDropDown from "./DeployContractDropDown";
import Navbar from "../components/Navbar";
import ChatArea from "./ChatArea";
import React, { useContext } from "react";
import { MyContext } from "@/components/Context";

export default function Chat() {

    const {showContractDropDown} = useContext(MyContext)

    return(
        <div className="flex w-full bg-[#1D2C40] flex-col gap-y-10 min-h-screen">
            <Navbar/>
            <div className="flex flex-col w-10/12 place-self-center justify-center items-center max-w-[1535px] text-xl">
                <div className="flex flex-col w-full gap-y-4">
                    <div className="font-['Hammersmith_One'] text-[#BDD9F2] text-3xl">Negotiation Panel</div>
                    <div className="relative min-h-[60vh] flex flex-col border-[0.5px] rounded-[7px] p-5 border-white">
                        <ChatArea/>
                        <div className="absolute top-[10px] right-[20px]">
                            <DeployContractDropDown/>
                        </div>
                        <div className={`absolute top-[70px] min-w-[205px] ${!showContractDropDown? 'hidden':'block'} p-2 bg-[#3D5473] rounded-lg border-[0.5px] border-white right-[20px]`}>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col w-full">
                                    <label htmlFor="freePubKey" className="text-sm text-white font-['Hammersmith_One']">
                                        freelancer's Public Address
                                    </label>
                                    <input type="text" id="freePubKey" placeholder="0xHOS8w93jdJw0..." className="text-sm hover:bg-[#4f6f9a] text-white placeholder:text-white bg-[#6581A6] rounded-lg px-1 py-1"/>
                                </div>
                                <div className="flex flex-col w-full">
                                    <label htmlFor="amount" className="text-sm text-white font-['Hammersmith_One']">
                                         Amount in ETH
                                    </label>
                                    <input type="number" id="amount" placeholder="0.2" className="text-sm hover:bg-[#4f6f9a] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 text-white placeholder:text-white bg-[#6581A6] rounded-lg px-1 py-1"/>
                                </div>
                                <button className="text-lg px-2 py-1 bg-[#6581A6] rounded-lg hover:bg-[#4f6f9a] active:bg-[#304969]">Deploy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}