'use client'
import { useRouter } from "next/navigation";

export default function RequestCard() {

    const router = useRouter();

  return (
    <div className="min-w-[80%] w-full border border-gray-300 flex justify-between text-[#BDD9F2] p-10 rounded-md">
      <div>
        <div className="text-3xl font-bold">Job title</div>
        <div>posted on: 12/10/2024</div>
      </div>
      <div>
        <button className="bg-[#3D5473] py-2 px-4 rounded-md" onClick={() => {router.push(`/requests/${1}`)}}>
          see all applicants
        </button>
        <div>Applications : 27</div>
      </div>
    </div>
  );
}
