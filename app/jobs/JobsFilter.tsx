'use client'
import React from "react";
import { useRecoilState } from "recoil";
import {skillsInJobs} from '../../RecoilStore/store'

const JobsFilter = () => {

    const [searchedSkill, setSearchedSkill] = useRecoilState(skillsInJobs);

    const searchHandler = () => {
      const searchInput = (document.getElementById('search') as HTMLInputElement).value;
      console.log(searchInput);
      setSearchedSkill(prev => {
        return [
          ...prev,
          searchInput
        ]
      })
    }

    return ( 
        <>
        <div className="flex space-x-2">
            <input
                type="text"
                placeholder="Search by Skills"
                id="search"
                className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
            />
            <button onClick={searchHandler} className="bg-[#3D5473] px-4 py-2 rounded-md hover:bg-[#3D5473] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[18px] font-['Hammersmith_One'] text-[#BDD9F2]">
              See More
            </button>
        </div>
        <div className="flex gap-x-2">
          {searchedSkill.map((skill, index) => {
            const removeSkill = () => {
              setSearchedSkill(prev => {
                return prev.filter(Sskill => Sskill !== skill)
              })
            }
            return(
              <button key={index} className="mt-2 bg-transparent px-4 py-2 rounded-full hover:bg-[#4D6483] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2 text-[#BDD9F2] font-['Hammersmith_One'] border border-[#BDD9F2]">
              <span>{skill}</span>
              <svg xmlns="http://www.w3.org/2000/svg" onClick={removeSkill} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            )
          })
          }
        </div>
        </>
     );
}
 
export default JobsFilter;