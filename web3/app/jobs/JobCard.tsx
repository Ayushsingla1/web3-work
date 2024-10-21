import React from 'react';

interface Skill {
  name: string;
}

interface JobCardProps {
  title: string;
  postedDate: string;
  description: string;
  skills: Skill[];
}

interface WorkProfile {
  title : string,
  description : string,
  amount : number,
  skills : string[],
  photoUrl : ""
}

const postedDate = '12/10/2024'

const JobCard: React.FC<WorkProfile> = ({ title, description, amount, skills, photoUrl }) => {
  return (
    <div className="bg-transparent rounded-lg p-6 max-w-xl border-[#BDD9F2] border-[0.5px] flex flex-col h-full">
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
      
      <button className="w-full bg-[#3D5473] hover:bg-[#4D6483] text-[#BDD9F2] font-bold py-2 px-4 rounded font-['Hammersmith_One']">
        See More
      </button>
    </div>
  );
};

export default JobCard;
