"use client";
import Link from "next/link";
import Image from "next/image";
import { Holtwood_One_SC } from "next/font/google";
import { Poppins } from "next/font/google";
import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "@/components/Context";
import { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const holtwoodOneSC = Holtwood_One_SC({
  weight: "400",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});
interface LoginSchema {
  email: string;
  password: string;
}
export default function Login(): React.ReactNode {
  const router = useRouter();
  const {googleAuth,findUser,signInWithEmail,githubAuth} = useContext(MyContext)

  useEffect(()=>{
    console.log("insider useffect")
    const fxn = async() => {
      const res = await findUser();
      console.log("response is" , res);
      if(res){
        console.log("pushed")
        router.push('/');
      }
    };
    fxn();
  },[router,findUser]);

  const [details, setDetails] = useState<LoginSchema>({
    email: "",
    password: "",
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.target;
    return setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async(e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try{
      await signInWithEmail(details.email,details.password);
      toast.success("LoggedIn Successfully")
      router.push('/')
    }
    catch{
      toast.error("Unable to logIn")
    }
  };

  const GoogleLogin = async()=>{
    try{
      await googleAuth();
      toast.success('LoggedIn successfully')
      router.push('/')
    }
    catch{
      toast.error("Unable to LogIn")
    }
  };

  const GithubSignup = async(e : React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    try{
      await githubAuth();
      toast.success("Account Created Successfully")
      router.push('/');
    }
    catch{
      toast.error("Error while creating account")
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="relative w-3/5">
        <Image
          src="/images/programmer.png"
          alt="Programmer"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-2/5 p-12 bg-gradient-to-b from-[#6581A6] to-[#273240]">
        <h1
          className={`mb-8 text-4xl text-white text-center ${holtwoodOneSC.className}`}
        >
          WELCOME BACK
        </h1>
        <div className="bg-gradient-to-b from-[#6581A6] to-[#303e50] bg-opacity-50 p-8 rounded-xl w-full max-w-md h-[400px] flex flex-col justify-between shadow-lg">
          <form className="space-y-6 flex-grow mt-4">
            <div className="space-y-10 mb-10">
              <div>
                <label
                  htmlFor="email"
                  className={`block text-[18px] font-medium text-[#F3F3F3] ${holtwoodOneSC.className}`}
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={details.email}
                  onChange={changeHandler}
                  className="w-full px-3 py-2 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D7E4F0]"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block text-[18px] font-medium text-[#F3F3F3] ${holtwoodOneSC.className}`}
                >
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={details.password}
                  onChange={changeHandler}
                  className="w-full px-3 py-2 mt-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D7E4F0]"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/3 px-4 py-2 text-black bg-[#D7E4F0] rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-['Hammersmith_One'] text-[18px]"
                onClick={(e) => submitHandler(e)}
              >
                Login
              </button>
            </div>
          </form>
          <p className={`mt-4 text-sm text-center ${poppins.className} text-black`}>
            Don't have an account? <Link href="/signup" className="text-blue-400 hover:underline font-semibold">Sign Up</Link>
          </p>
        </div>
        <div className="flex justify-center mt-10 space-x-4">
          <button
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 w-18 h-18 flex items-center justify-center"
            onClick={() => GoogleLogin()}
          >
            <Image
              src="/images/google.svg"
              alt="Google"
              width={30}
              height={30}
            />
          </button>
          <button
            className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 w-18 h-18 flex items-center justify-center"
            onClick={(e) => {
              GithubSignup(e);
            }}
          >
            <Image
              src="/images/github.svg"
              alt="GitHub"
              width={30}
              height={30}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
