import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <div className="bg-[#3D5473] text-white py-20">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between pt-16">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <h1 className="text-[34px] font-bold mb-4 font-['Inknut_Antiqua'] text-[#BDD9F2] mt-12">
                        Find a freelancer for hire
                    </h1>
                    <p className="text-[#BDD9F2] mb-6 text-[26px] font-['Inknut_Antiqua']">
                        <span className="inline-block whitespace-nowrap">
                            this website lets you the client
                        </span>
                        <br />
                        <span className="inline-block whitespace-nowrap">
                            find best person for the job with
                        </span>
                        <br />
                        a secure way of transaction or
                    </p>
                </div>
                <div className="lg:w-2/3 lg:-mb-80 lg:-mt-32 z-10 relative">
                    <Image
                        src="/images/freelancer.jpeg"
                        alt="Freelancer working"
                        width={1200}
                        height={960}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <div className="bg-[#1D2C40] mt-0 p-6 relative overflow-hidden">
                <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between">
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <p className="text-[#BDD9F2] mb-6 text-[26px] font-['Inknut_Antiqua']">
                            payment using blockchain
                            <br />
                            technology...
                        </p>
                        <div className="w-full flex justify-start mb-8">
                            <Link href="/freelancers" className="ml-12 bg-[#3D5473] hover:bg-blue-600 text-[#BDD9F2] text-[28px] py-2 px-4 rounded inline-block font-['Hammersmith_One']">
                                find a freelancer
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between min-h-[400px] relative">
                    <div className="lg:w-1/2 mb-8 lg:mb-0 order-2 lg:order-1">
                        <div className="relative">
                            <Image
                                src="/images/blockchain.png"
                                alt="Blockchain technology"
                                width={250}
                                height={250}
                                className="rounded-lg mb-4 relative -top-32"
                            />
                            <Image
                                src="/images/jobseeker.png"
                                alt="Job seeker working"
                                width={500}
                                height={400}
                                className="rounded-lg absolute top-[-100px] left-[50px]"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 mb-8 lg:mb-0 order-1 lg:order-2">
                        <h2 className="text-[34px] font-['Inknut_Antiqua'] mb-4 text-[#BDD9F2] font-bold">Find a job fit for you now!!</h2>
                        <p className="text-[#BDD9F2] mb-6 text-[26px] font-['Inknut_Antiqua']">
                            Search from wide variety of jobs
                            <br />
                            listed in the &ldquo;jobs&rdquo; tabs.
                        </p>
                        <div className="flex justify-start">
                            <Link href="/jobs" className="ml-4 bg-[#3D5473] hover:bg-blue-600 text-[#BDD9F2] font-['Hammersmith_One'] py-2 px-6 rounded text-[28px]">
                                find a job
                            </Link>
                        </div>
                    </div>
                    <Image
                        src="/images/blockchain.png"
                        alt="Blockchain technology"
                        width={250}
                        height={250}
                        className="absolute -bottom-20 right-0 lg:-right-24 rounded-lg"
                    />
                </div>
            </div>
        </div> 
    );
};

export default Hero;
