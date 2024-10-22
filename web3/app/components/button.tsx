"use client"
import { Dropdown } from 'flowbite-react';
import { useConnect } from 'wagmi';
import { useAccount } from 'wagmi';
import { useDisconnect } from 'wagmi';
import Image from 'next/image';
const MyDropdown = () => {
    const {connectors,connect} = useConnect();
    const {address} = useAccount();
    const {disconnect} = useDisconnect();
    const metamask = "metamask"
    if(!address){
        return <div className='bg-[#3D5473] rounded-md border-opacity-20 shadow-md'>
        <Dropdown label="Select Wallet" className='border-none'>
            {
                connectors.map((connector,index) => (
                    <Dropdown.Item key = {index} onClick={()=>connect({connector})} className='flex items-center justify-between'>
                        <div>{connector.name}</div>
                        <div><Image src = {`/images/${connector.name.toLowerCase()}.svg`} alt = "error" width={30} height={30}></Image></div>
                    </Dropdown.Item>
                ))
            }
        </Dropdown>

        </div>
    }
    else{
        return (
            <button onClick={()=>disconnect()} className='font-semibold px-3 py-2 text-xl bg-[#3D5473] text-[#BDD9F2] rounded-sm'>Disconnect</button>
        )
    }
}

export default MyDropdown;
