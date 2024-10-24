"use client";

export default function ApplicantCard() {
  return (
    <div className="min-w-[80%] w-full border border-gray-300 flex justify-between text-[#BDD9F2] p-4 rounded-md">
      <div className="flex gap-3 items-baseline">
        <div className="text-2xl font-bold">User name</div>
        <div>Resume</div>
      </div>
      <div className="flex gap-3 items-baseline text-xl">
        <div className="py-2 px-2 rounded-md">Last Active: 12/10/2024</div>
        <div className="bg-[#3D5473] py-2 px-4 rounded-md">Profile</div>
      </div>
    </div>
  );
}