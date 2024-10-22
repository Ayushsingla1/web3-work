import RequestCard from "./requestCard";
import Navbar from "../components/Navbar";

export default function Requests() {
  return (
    <div className="min-h-screen bg-[#1D2C40]">
      <Navbar />
      <div className="flex justify-center items-center w-full">
        <div className="flex flex-col w-10/12">
          <h1 className="text-white text-4xl py-10">Your Job Postings...</h1>
          <div className="w-full flex flex-col justify-center items-center gap-5 mb-10">
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
            <RequestCard />
          </div>
        </div>
      </div>
    </div>
  );
}
