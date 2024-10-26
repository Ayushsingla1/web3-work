'use client'
import { useRouter } from "next/navigation";


interface props {
  title : string,
  date : string,
  id : string,
  applicantsCount : number
}
export default function RequestCard({title , date , applicantsCount} : props) {

    const router = useRouter();

  return (
    <div className="min-w-[80%] w-full border border-gray-300 flex justify-between text-[#BDD9F2] p-10 rounded-md">
      <div>
        <div className="text-3xl font-bold">{title}</div>
        <div>posted on: {date}</div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="bg-[#3D5473] py-2 px-4 rounded-md" onClick={() => {router.push(`/requests/${1}`)}}>
          see all applicants
        </button>
        <div>Applications : {applicantsCount}</div>
      </div>
    </div>
  );
}