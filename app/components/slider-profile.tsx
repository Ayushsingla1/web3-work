"use client"
import { useRecoilState } from "recoil"
import { profile, profileCreation } from "@/RecoilStore/store"
import { count , } from "@/RecoilStore/store"
import { useContext } from "react"
import { MyContext } from "@/components/Context"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
const SliderProfile = () => {
    const {updateProfile} = useContext(MyContext)
    const [userData,setUserData] = useRecoilState(profileCreation)
    const [data] = useRecoilState(profile)
    const router = useRouter();
    const [val,setval] = useRecoilState(count);
    console.log(data)
    console.log(data.id)
    const NextClickHandler = ()=>{
        console.log(val)
        console.log("got called")
        setval(val+1);
    }

    const PrevClickHandler = ()=>{
        setval(val-1);
    }

    const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target;
        let value :  string | string[] | File = e.target.value;
        if(name === "skills"){
            value = value.trim().split(',');
        }
        if(name === "image" && e.target.files){
            value = e.target.files[0];
        }
        console.log("name is : ", name , "value is : ",value)
        setUserData((prev) => (
            {
                ...prev,
                [name] : value
            }
        ))
    }

    const submitHandler = async(e : React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log(userData)
        try{
            console.log("hi there")
            console.log(data.id)
            console.log("userData is " , userData)
            await updateProfile(data.id,userData);
            console.log("siuuu ")
            toast.success("Successfully update profile")
            setval(0);
            router.push('/profile');
        }
        catch(e){
            console.log(e);
            toast.error("Error occured while updating profile")
        }
    }


    if(val === 0){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">Choose a Username</div>
            <input placeholder="username..." name = "name" value = {userData.name} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80">preferred username is you name.</div>

            <div className="flex self-end mt-10 px-3 py-1  font-bold text-black rounded-md items-center gap-x-2">
            <button onClick={()=>{if(userData.name.length){NextClickHandler()}}} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Next</button>
            {/* <Image src = "/images/arrow.svg" alt = "error" width={15} height={20} className="stroke-2"></Image> */}
            </div>
        </div>
    }
    else if(val === 1){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">A detailed description of you</div>
            <input placeholder="description..." name = "description" value = {userData.description} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80">Remember to make it short, concise and to the point</div>

            <div className="flex self-end mt-10 px-3 py-1  font-bold text-black rounded-md items-center gap-x-2">
            <button onClick={()=>PrevClickHandler()} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Prev</button>
            <button onClick={()=>{if(userData.description.length){NextClickHandler()}}} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Next</button>
            </div>
        </div>
    }
    else if(val === 2){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">Add you resume to stand out</div>
            <input placeholder="Share a public link of your resume" name = "resume" value = {userData.resume} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80 text-justify">One of the first thing the client check is your Resume,
hence having a great resume can do wonders to your
career.</div>

            <div className="flex self-end mt-10 px-3 py-1  font-bold text-black rounded-md items-center gap-x-2">
            <button onClick={()=>PrevClickHandler()} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Prev</button>
            <button onClick={()=>{if(userData.resume.length){NextClickHandler()}}} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Next</button>
            </div>
        </div>
    }
    else if(val === 3){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">Skills</div>
            <input placeholder="Skills..." name = "skills" value = {userData.skills.join(',')} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80">Specify the skills to showcase you value to potential
clients and generate trust that the job will be done
without any hurdles.</div>


            <div className="flex self-end mt-10 px-3 py-1  font-bold text-black rounded-md items-center gap-x-2">
            <button onClick={()=>PrevClickHandler()} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Prev</button>
            <button onClick={()=>{if(userData.description.length){NextClickHandler()}}} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Next</button>
            </div>
        </div>
    }
    else if(val === 4){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] h-[40%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">Basic Skills required for the job</div>
            <input type = "file" placeholder="Uplaod A Image" name = "image" onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80">Specify the basic skill the freelancer might need for 
            applying to the job.</div>
            <div className="flex self-end mt-10 px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md items-center">
            <button onClick={(e)=> submitHandler(e)} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Submit</button> 
            </div>
        </div>
    }
    

}

export default SliderProfile;