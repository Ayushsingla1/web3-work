'use client'
import { MyContext } from "@/components/Context"
import Navbar from "../components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"

interface UserProfile {
    name : string,
    description : string,
    resume : string,
    skills : string[],
    work : string[],
    image : ""
    isAvailable: boolean;
  }
  

export default function User({ params }: { params: { id: string } }) {
    const [user, setUser] = useState<UserProfile>({
        name: "",
        description: "",
        resume: "",
        skills: [],
        work: [],
        image : "",
        isAvailable: false
      })
    const router = useRouter()
    const {getProfileById} = useContext(MyContext);
    const id = params.id;

    useEffect(() => {
        getProfileById(id).then(
            (res: any) => {
                console.log(res)
                setUser(res);
            }
        )
    }, [])

    return (
        <div className="bg-[#1D2C40] h-screen w-screen overflow-hidden">
            <Navbar />
            <div className="px-40 mt-10">
                <div className="text-3xl text-[#8BADD9] font-semibold">Profile</div>
                <div className="flex flex-col gap-y-10">
                    <div className="flex mt-6 gap-x-10">
                        <Image
                            src={user?.image || '/images/default-avatar.png'}
                            alt="Profile Picture"
                            width={320}
                            height={320}
                            className="rounded-sm shadow-sm"
                        />
                        <div className="flex flex-col justify-between">
                            <div className="flex flex-col gap-y-3">
                                <div className="text-2xl font-semibold text-[#BDD9F2]">{user?.name || 'Name not available'}</div>
                                <button
                                    className={`min-w-36 px-3 h-10 py-1 rounded-sm text-[#1D2C40] text-2xl font-bold ${user?.isAvailable ? 'bg-[#BDD9F2] hover:scale-105' : 'bg-[#8BADD9]'}`}
                                    onClick={() => router.push(`/${params.username}/chat`)}
                                >
                                    start a conversation
                                </button>
                            </div>
                            <div className="flex flex-col gap-y-3">
                                <div className="flex gap-x-2 items-center">
                                    <Link href={user?.resume}>
                                        <Image src='/images/resume.svg' alt="Resume" width={40} height={40} />
                                    </Link>
                                    <div className="text-2xl text-[#BDD9F2] font-semibold">Resume</div>
                                </div>
                                <div className="flex text-xl font-semibold text-[#8BADD9] text-justify">{user?.description || 'No description available.'}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="text-2xl font-semibold text-[#8BADD9]">Proficient Skills</div>
                        <div className="flex gap-x-4">
                            {user?.skills?.map((tag: string, index: number) => (
                                <div key={index} className="px-3 py-1 text-xl font-semibold bg-[#3D5473] text-[#BDD9F2] rounded-sm text-center">
                                    {tag}
                                </div>
                            )) || <div className="text-[#BDD9F2]">No skills listed.</div>}
                        </div>
                    </div>
                <button onClick={()=>router.push('/profile_creation')} className=" w-56 h-10 py-1 rounded-sm text-[#1D2C40] text-2xl font-bold bg-[#BDD9F2]">Update Profile</button>
                </div>
            </div>
        </div>
    )
  }
