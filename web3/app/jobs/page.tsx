import Navbar from "../components/Navbar";
import JobCard from "./JobCard";
import Footer from "../components/Footer";
export default function Jobs() {
  const jobsData = [
    {
      title: "Build a Uber like website",
      postedDate: "2024-12-10",
      description: "The project main goal is to create a Uber like website with almost all the relevant features along with other custom features which will be conveyed after.",
      skills: [{ name: "Skill 1" }, { name: "Skill 2" }, { name: "Skill 3" }, { name: "Skill 4" }]
    },
    {
      title: "Develop a Food Delivery App",
      postedDate: "2024-11-15",
      description: "Create a food delivery app with real-time tracking and payment integration.",
      skills: [{ name: "React" }, { name: "Node.js" }, { name: "MongoDB" }]
    },
    {
      title: "E-commerce Platform",
      postedDate: "2024-10-20",
      description: "Build a scalable e-commerce platform with user-friendly UI and secure payment gateway.",
      skills: [{ name: "JavaScript" }, { name: "AWS" }, { name: "Docker" }]
    },
    {
      title: "Social Media App",
      postedDate: "2024-09-30",
      description: "Develop a social media application with features like messaging, notifications, and media sharing.",
      skills: [{ name: "Flutter" }, { name: "Firebase" }, { name: "GraphQL" }]
    },
    {
      title: "Online Learning Platform",
      postedDate: "2024-08-25",
      description: "Create an online learning platform with video streaming and interactive quizzes.",
      skills: [{ name: "Python" }, { name: "Django" }, { name: "PostgreSQL" }]
    },
    {
      title: "Travel Booking Website",
      postedDate: "2024-07-10",
      description: "Build a travel booking website with features like hotel and flight booking.",
      skills: [{ name: "PHP" }, { name: "Laravel" }, { name: "MySQL" }]
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#1D2C40' }}>
      <Navbar />
      <div className="container mx-auto mt-8 px-4 pb-80">
        <h1 className="font-bold mb-6 text-[#BDD9F2] font-['Hammersmith_One'] text-[50px]">Find a Job</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by Skills"
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent text-white"
          />
          <button className="bg-[#3D5473] px-4 py-2 rounded-md hover:bg-[#3D5473] focus:outline-none focus:ring-2 focus:ring-blue-500 text-[18px] font-['Hammersmith_One'] text-[#BDD9F2]">
            See More
          </button>
        </div>
        <button className="mt-2 bg-transparent px-4 py-2 rounded-full hover:bg-[#4D6483] focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2 text-[#BDD9F2] font-['Hammersmith_One'] border border-[#BDD9F2]">
          <span>React</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mt-10 grid grid-cols-2 gap-4 justify-items-center">
          {jobsData.map((job, index) => (
            <JobCard 
              key={index}
              title={job.title}
              postedDate={job.postedDate}
              description={job.description}
              skills={job.skills}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
