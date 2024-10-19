import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import freelancersData from './freeLancer.json'; // Import the JSON data
import FreelancerCard from './FreeLancerCard'; // Correct the casing to match the file name
import FreelanceFilter from "./FreelancFilter";
export default function Freelancer() {

  return (
    <div className="min-h-screen" style={{ background: '#1D2C40' }}>
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="mt-8 w-10/12 max-w-[1535px] pb-80">
          <h1 className="font-bold mb-6 text-[#BDD9F2] font-['Hammersmith_One'] text-[50px]">Find Freelancers</h1>
          <FreelanceFilter/>
          <div className="mt-10 flex flex-wrap gap-4 justify-items-center">
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
      </div>
      <Footer />
    </div>
  );
}
