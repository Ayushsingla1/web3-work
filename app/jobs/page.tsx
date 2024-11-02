'use client'
import React from "react";
import Navbar from "../components/Navbar";
import JobCard from "./JobCard";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/components/Context";
import { useRouter } from "next/navigation";
import { jobsArray, WorkProfileNew } from "@/RecoilStore/store";
import { useRecoilState } from "recoil";
import JobsFilter from "./JobsFilter";
// import { searchInJobs } from "@/RecoilStore/fiters";



export default function Jobs() {
  const [ userId, setUserId ] = useState("");
  const [posts, setPosts] = useRecoilState(jobsArray)
  // const filteredJobs = useRecoilValue(searchInJobs)
  // const [allJobs, setAllJobs] = useState<WorkProfileNew[]>()
  const [loading, setLoading] = useState<boolean>(true);
  const {getposts , findUser} = useContext(MyContext);
  // const skillsToSearch = useRecoilValue(skillsInJobs)

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
  }, [router, findUser])

  useEffect(() => {
    getposts().then((res:WorkProfileNew[]) => {
      console.log(res);
      setPosts(res);
      setLoading(false)
    })
  }, [getposts,findUser, setPosts])

  // useEffect(() => {
  //   // if(!filteredJobs && allJobs?.length !== 0){
  //   //   setPosts(allJobs);
  //   //   return;
  //   // }
  //       console.log(filteredJobs);
  //       setPosts(filteredJobs);
  //   }, [filteredJobs]);

  return (
    <div className="min-h-screen" style={{ background: '#1D2C40' }}>
      <Navbar />
      <div className="w-full flex justify-center items-center px-4 pb-80">
        <div className="mt-8 w-10/12 max-w-[1535px] pb-80">
          <h1 className="font-bold mb-4 text-[#BDD9F2] font-['Hammersmith_One'] text-[50px]">Find a Job</h1>
          <JobsFilter/>
          {/* <div className="mt-10 grid grid-cols-2 gap-4 justify-items-center"> */}
          <div className="mt-10 flex flex-wrap gap-4 justify-items-center">
            {posts? posts.map((post:WorkProfileNew, index:number) => {
              if( post.uid !== userId ){
                console.log(post);
                return <JobCard 
                key={index}  
                title={post.title}
                description={post.description}
                amount={post.amount}
                skills={post.skills}
                id = {post.id}
                applicants = {post.applicants}
                userId =  {userId}
                />
              }
            }): 
              (
                <>
                {
                  loading? (<div className="w-full justify-center flex items-center text-white text-xl uppercase">Loading...</div>)
                  : (<div className="w-full justify-center flex items-center text-white text-xl uppercase">No Freelancers found...</div>)
                }
                </>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
