'use client'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FreelancerCard from './FreeLancerCard'; 
import FreelanceFilter from "./FreelancFilter";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/components/Context";
import Pimage from '../../public/images/phantom.svg'
import { useRecoilState, useRecoilValue } from "recoil";
import { freelancersArray, skillToSearch } from "@/RecoilStore/store";
import { searchFilterFreelancers } from "@/RecoilStore/fiters";

interface UserProfile {
  name : string,
  description : string,
  resume : string,
  skills : string[],
  work : string[],
  image : string,
  id : string
}


export default function Freelancer() {

  const [allFreelancers, setAllFreelancers] = useRecoilState(freelancersArray)
  const filteredFreelancers = useRecoilValue(searchFilterFreelancers);
  const [freelancers, setFreelancers] = useState<UserProfile[]>();
  const [loading, setLoading] = useState<boolean>(true)

  
  const {getFreeLancers} = useContext(MyContext)

  useEffect(() => {
    getFreeLancers().then((res:UserProfile[]) => {
      console.log(res);
      setFreelancers(res);
      setAllFreelancers(res);
      setLoading(false);
    })
  }, [getFreeLancers])

  useEffect(() => {
    if(!filteredFreelancers && allFreelancers.length !== 0){
      setFreelancers(allFreelancers);
      return
    }
    setFreelancers(filteredFreelancers);
  }, [filteredFreelancers])

  return (
    <div className="min-h-screen flex flex-col justify-between items-center w-full" style={{ background: '#1D2C40' }}>
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="mt-8 w-10/12 max-w-[1535px] pb-80">
          <h1 className="font-bold mb-6 text-[#BDD9F2] font-['Hammersmith_One'] text-[50px]">Find Freelancers</h1>
          <FreelanceFilter/>
          <div className="mt-10 flex flex-wrap gap-4 justify-items-center">
            {freelancers? freelancers.map((freelancer, index) => (
              <FreelancerCard 
                key={index}
                name={freelancer.name}
                image={Pimage}
                id = {freelancer.id}
                description={freelancer.description}
                skills={freelancer.skills}
              />)):
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
