import React from 'react';

interface Skill {
  name: string;
}

interface FreelancerCardProps {
  name: string;
  image: string;
  description: string;
  skills: string[];
}

const postedDate = "12/10/2024"

const FreelancerCard: React.FC<FreelancerCardProps> = ({ name, image, description, skills }) => {
  return (
    <div className="bg-transparent rounded-lg p-6 min-w-[500px] w-full xl:w-[49%] min-h-[360px] border-[#BDD9F2] border-[0.5px] flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img src={image} alt={`${name}'s photo`} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h2 className="text-2xl font-bold text-[#BDD9F2] font-['Hammersmith_One']">{name}</h2>
          <p className="text-[#BDD9F299] text-sm font-['Hammersmith_One']">last active: {postedDate}</p>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col">
        <p className="text-[#BDD9F2] mb-4 font-['Hammersmith_One'] flex-grow">{description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center mb-2">
            <img src="/images/resume.svg" alt="resume" className="w-6 h-6 mr-2" />
            <h3 className="text-[#BDD9F299] font-['Hammersmith_One']">Resume</h3>
          </div>
          
          <h3 className="text-[#BDD9F2] mb-2 font-['Hammersmith_One']">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(skills) && skills.length > 0 ? (
              skills.map((skill, index) => (
                <span key={index} className="bg-[#3D5473] text-[#BDD9F2] px-4 py-1 rounded-md text-sm">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400">No skills specified</span>
            )}
          </div>
        </div>
      </div>
      
      <button className="w-full bg-[#3D5473] hover:bg-[#4D6483] text-[#BDD9F2] font-bold py-2 px-4 rounded mt-4 font-['Hammersmith_One']">
        See More
      </button>
    </div>
  );
};

export default FreelancerCard;
