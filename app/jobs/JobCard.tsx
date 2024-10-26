'use client'
import React from 'react';
import { MyContext } from '@/components/Context';
import { useContext } from 'react';
import toast from 'react-hot-toast';

interface WorkProfile {
  title : string,
  description : string,
  skills : string[],
}

interface WorkProfile {
  title : string,
  description : string,
  amount : number,
  skills : string[],
  id : string,
  applicants : string[],
  userId : string
}


const postedDate = '12/10/2024'

const JobCard: React.FC<WorkProfile> = ({ title, description, skills , id , applicants , userId}) => {

  const submitHandler = async(e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      applicants.push(userId);
      await applyJobs(id,applicants)
      toast.success('Successfully Applied')
    }
    catch{
      console.log("Error occured while applying for job")
    }
  }
  const {applyJobs} = useContext(MyContext)
  return (
    <div className="bg-transparent rounded-lg p-6 w-full xl:w-[49%] min-h-[360px] border-[#BDD9F2] border-[0.5px] flex flex-col h-full">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-[#BDD9F2] mb-2 font-['Hammersmith_One']">{title}</h2>
        <p className="text-[#BDD9F2] text-sm mb-4 font-['Hammersmith_One']">posted on: {postedDate}</p>
        
        <p className="text-[#BDD9F2] mb-6 font-['Hammersmith_One']">{description}</p>
        
        <h3 className="text-[#BDD9F2] mb-2 font-['Hammersmith_One']">Required Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill:string, index:number) => (
              <span key={index} className="bg-[#3D5473] text-[#BDD9F2] px-4 py-1 rounded-md text-sm">
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No skills specified</span>
          )}
        </div>
      </div>
      
      <button onClick={(e)=>(submitHandler(e))} className="w-full bg-[#3D5473] hover:bg-[#4D6483] text-[#BDD9F2] font-bold py-2 px-4 rounded font-['Hammersmith_One']" >
        Apply
      </button>
    </div>
  );
};

export default JobCard;
