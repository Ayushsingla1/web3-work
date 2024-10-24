"use client";
import Navbar from "../../components/Navbar";
import { useParams } from "next/navigation";
import ApplicantCard from "./applicantCard";

const RequestDetailPage = () => {
  const { id } = useParams(); // Extract the 'id' param from the URL

  return (
    <div className="min-h-screen bg-[#1D2C40]">
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-10/12">
          <h1 className="text-white text-4xl py-10">
            Job Title having Job Id: {id}
          </h1>
          <div className="w-full flex flex-col justify-center items-center gap-5 mb-10">
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
            <ApplicantCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;