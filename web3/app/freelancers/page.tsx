import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import freelancersData from './freeLancer.json'; // Import the JSON data
import FreelancerCard from './FreeLancerCard'; // Correct the casing to match the file name
export default function Freelancer() {
  return (
    <div className="min-h-screen" style={{ background: '#1D2C40' }}>
      <Navbar />
      <div className="container mx-auto mt-8 px-4 pb-80">
        <h1 className="font-bold mb-6 text-[#BDD9F2] font-['Hammersmith_One'] text-[50px]">Find Freelancers</h1>
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
          {freelancersData.map((freelancer, index) => (
            <FreelancerCard 
              key={index}
              name={freelancer.name}
              photoUrl={freelancer.photoUrl}
              postedDate={freelancer.postedDate}
              description={freelancer.description}
              skills={freelancer.skills}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
