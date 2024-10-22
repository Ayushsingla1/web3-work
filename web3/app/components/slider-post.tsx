"use client"
import { useRecoilState } from "recoil"
import { postCreation , postCount } from "@/RecoilStore/store"
import { useContext } from "react"
import { MyContext } from "@/components/Context"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
const PostSlider = () => {
    const [postData,setPostData] = useRecoilState(postCreation)
    const [val,setval] = useRecoilState(postCount);
    const {createPost} = useContext(MyContext)
    const router = useRouter();
    const date = new Date();
    const NextClickHandler = ()=>{
        console.log(val)
        console.log("got called")
        setval(val+1);
    }

    const PrevClickHandler = ()=>{
        setval(val-1);
    }

    const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target
        let {value} : {value : string | string[]} = e.target;
        console.log("name is : ",name , "value is : ",value)
        if(name === "skills"){
            value = value.trim().split(',');
        }
        setPostData((prev) => (
            {
                ...prev,
                [name] : value
            }
        ))
    }

    const submitHandler = async(e : React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log(postData)
        console.log("hi there")
        try{
            const res = await createPost({...postData,postDate : `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`});
            console.log(res)
            toast.success("Posted Successfully")
            router.push('/jobs')
        }
        catch(e){
            console.log(e)
        }
    }


    if(val === 0){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">Choose a title for your work</div>
            <input placeholder="username..." name = "title" value = {postData.title} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80">give you project a title that will catch the attentions of 
            the best freelancers on the platform . Remember to make it short, concise and to the point</div>

            <div className="flex self-end mt-10 px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md items-center">
            <button onClick={()=>{if(postData.title.length){NextClickHandler()}}} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Next</button>
            {/* <Image src = "/images/arrow.svg" alt = "error" width={15} height={20} className="stroke-2"></Image> */}
            </div>
        </div>
    }
    else if(val === 1){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">A detailed description of your work</div>
            <input placeholder="description..." name = "description" value = {postData.description} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80">Remember to make it short, concise and to the point</div>

            <div className="flex self-end mt-10 px-3 py-1  font-bold text-black rounded-md items-center gap-x-2">
            <button onClick={()=>PrevClickHandler()} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Prev</button>
            <button onClick={()=>{if(postData.description.length){NextClickHandler()}}} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Next</button>
            </div>
        </div>
    }
    else if(val === 2){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">Maximum amount willing to pay</div>
            <input placeholder="Share a public link of your resume" name = "amount" value = {postData.amount} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80 text-justify">This field can be empty if you want to negotiate with
            the freelancer in the future.</div>

            <div className="flex self-end mt-10 px-3 py-1  font-bold text-black rounded-md items-center gap-x-2">
            <button onClick={()=>PrevClickHandler()} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Prev</button>
            <button onClick={()=>{{NextClickHandler()}}} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Next</button>
            </div>
        </div>
    }
    else if(val === 3){
        return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] px-20 py-20 rounded-md">
            <div className="text-black font-semibold text-2xl">Basic Skills required for the job</div>
            <input placeholder="Skills..." name = "skills" value = {postData.skills.join(',')} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
            <div className="text-[#1D2C40] font-semibold opacity-80">Specify the basic skill the freelancer might need for 
            applying to the job.</div>
            <div className="flex self-end mt-10 px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md items-center">
            <button onClick={(e)=> submitHandler(e)} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Submit</button> 
            </div>
        </div>
    }
    // else if(val === 4){
    //     return <div className="bg-[#8BADD9] flex flex-col gap-y-2 w-[50%] h-[40%] px-20 py-20 rounded-md">
    //         <div className="text-black font-semibold text-2xl">Basic Skills required for the job</div>
    //         <input placeholder="Skills..." name = "skills" value = {postData.skills.join(',')} onChange={(e)=>changeHandler(e)} className="bg-[#BDD9F2] px-2 py-1 rounded-md text-black"></input>
    //         <div className="text-[#1D2C40] font-semibold opacity-80">Specify the basic skill the freelancer might need for 
    //         applying to the job.</div>
    //         <div className="flex self-end mt-10 px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md items-center">
    //         <button onClick={(e)=> submitHandler(e)} className="px-3 py-1 bg-[#BDD9F2] font-bold text-black rounded-md">Submit</button> 
    //         </div>
    //     </div>
    // }

}

export default PostSlider;