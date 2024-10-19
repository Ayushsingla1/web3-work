import Link from 'next/link';
import Image from 'next/image';
import { Holtwood_One_SC } from 'next/font/google'
import { Poppins } from 'next/font/google'

const holtwoodOneSC = Holtwood_One_SC({
  weight: '400',
  subsets: ['latin'],
})

const poppins = Poppins({
  weight: ['400', '600'],
  subsets: ['latin'],
})

export default function Login() {
  return (
    <div className="flex min-h-screen">
      <div className="relative w-3/5">
        <Image src="/images/programmer.png" alt="Programmer" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col items-center justify-center w-2/5 p-12 bg-gradient-to-b from-gray-800 to-gray-700">
        <h1 className={`mb-8 text-4xl text-white text-center ${holtwoodOneSC.className}`}>
          LOGIN
        </h1>
        <div className="bg-gray-600 p-8 rounded-lg w-full max-w-md h-[400px] flex flex-col justify-between shadow-lg">
          <form className="space-y-6 flex-grow mt-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className={`block text-[18px] font-medium text-[#F3F3F3] ${holtwoodOneSC.className}`}>USERNAME</label>
                <input type="text" id="username" name="username" className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D7E4F0]" />
              </div>
              <div>
                <label htmlFor="password" className={`block text-[18px] font-medium text-[#F3F3F3] ${holtwoodOneSC.className}`}>PASSWORD</label>
                <input type="password" id="password" name="password" className="w-full px-3 py-2 mt-1 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D7E4F0]" />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="w-1/3 px-4 py-2 text-black bg-[#D7E4F0] rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-['Hammersmith_One'] text-[18px]">
                Login
              </button>
            </div>
          </form>
          <p className={`mt-4 text-sm text-center ${poppins.className} text-black`}>
            Don't have an account? <Link href="/signup" className="text-blue-400 hover:underline font-semibold">Sign Up</Link>
          </p>
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 w-12 h-12 flex items-center justify-center">
            <Image src="/images/google.svg" alt="Google" width={24} height={24} />
          </button>
          <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 w-12 h-12 flex items-center justify-center">
            <Image src="/images/github.svg" alt="GitHub" width={24} height={24} />
          </button>
          <button className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 w-12 h-12 flex items-center justify-center">
            <Image src="/other-icon.png" alt="Other" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
