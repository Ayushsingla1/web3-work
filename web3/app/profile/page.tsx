"use client"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { MyContext } from "@/components/Context"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Profile } from "@/RecoilStore/store"
import { useRecoilState } from "recoil"
const ProfilePage = () => {
    const {FindUser , GetProfile} = useContext(MyContext);
    const [data,setData] = useRecoilState(Profile)
    useEffect(()=>{
        const fxn = async() => {
            const res = await FindUser();
            console.log(res)
            if(!res){
                const router = useRouter();
                router.push('/')
            }
            else{
                const user =  await GetProfile(res)
                console.log(user.data())
                setData(user.data());
            }
        }
        fxn();
    },[])
    return(
        <div className="bg-[#1D2C40] h-screen w-screen overflow-hidden">
            <Navbar/>
            <div className="px-40 mt-10">
            <div className="text-3xl text-[#8BADD9] font-semibold">Profile</div>

            <div className="flex flex-col gap-y-10">
            <div className="flex mt-6 gap-x-10">
                <img src = {data?.image} alt = "error" className="w-80 h-80 rounded-sm shadow-sm"></img>
                <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-y-3">
                <div className="text-2xl font-semibold text-[#BDD9F2]">{data?.name}</div>
                <div>
                    <button className={`w-36 h-10 py-1 rounded-sm text-[#1D2C40] text-2xl font-bold ${data?.isAvailable  ? 'bg-[#BDD9F2] hover:scale-105' :' bg-[#8BADD9]' }`}>Hire</button>
                </div>
                </div>
                <div className="flex flex-col gap-y-3">
                <div className="flex gap-x-2 items-center">
                <Link href="https://siu.com"><Image src = '/images/resume.svg' alt = "error" width={40} height={40}></Image></Link>
                <div className="text-2xl text-[#BDD9F2] font-semibold">Resume</div>
            </div>
            <div className="flex text-xl font-semibold text-[#8BADD9] text-justify">{data?.description}</div>
                </div>
            </div>
            </div>
            <div className="flex flex-col gap-y-5">
                <div className="text-2xl font-semibold text-[#8BADD9]">Proficient Skills</div> 
                <div className="flex gap-x-4">
                {data?.tags?.map((tag : string,index : number) => (
                    <div key = {index} className="px-3 py-1 text-xl font-semibold bg-[#3D5473] text-[#BDD9F2] rounded-sm text-center">
                        {tag}
                    </div>
                ))
                }
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default ProfilePage