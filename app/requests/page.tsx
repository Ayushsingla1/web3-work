'use client'
import RequestCard from "./requestCard";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/components/Context";
import { useRouter } from "next/navigation";

interface WorkProfile {
  title : string,
  description : string,
  amount : number,
  skills : string[],
  id : string,
  uid : string,
  applicants : string[]
  postDate : string
}



export default function Requests() {
  const [ userId, setUserId ] = useState("");
  const [posts, setPosts] = useState<WorkProfile[]>([{
    title : "",
    description : "",
    amount : 0,
    skills : [],
    id : "",
    uid : "",
    applicants : [],
    postDate : ""
  }]);

  const {getposts , findUser} = useContext(MyContext);

  const router = useRouter();


  useEffect(() => {
    const User = async() => {
      const res =  await findUser();
      if(!res){
        router.push('/login')
      }
      setUserId(res.uid)
    }
    User();
    getposts().then((res:WorkProfile[]) => {console.log(res);setPosts(res)})
  }, [getposts,findUser,router])


  return (
    <div className="min-h-screen bg-[#1D2C40]">
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-10/12">
          <h1 className="text-white text-4xl py-10">Your Job Postings...</h1>
          <div className="w-full flex flex-col justify-center items-center gap-5 mb-10">
          {posts?.map((post:WorkProfile, index:number) => {
              if( post.uid === userId ){
                console.log(post);
                return <RequestCard 
                key = {index}
                title={post.title}
                id = {post.id}
                applicantsCount={post.applicants.length}
                date = {post.postDate}
                />
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );

}