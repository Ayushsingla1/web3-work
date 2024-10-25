// components/InfoCard.tsx

import React from 'react';
import Image from 'next/image';

const InfoCard: React.FC = () => {
  return (
    <>
      <div className="bg-[#3D5473] text-white p-6 shadow-lg flex">
        <div className="w-1/3 mr-6">
          <Image
            src="/images/blockchain.png"
            alt="Informational image"
            width={400}
            height={400}
            objectFit="cover"
          />
        </div>
        <div className="w-2/3">
          <h2 className="text-[34px] font-bold mb-4 font-['Inknut_Antiqua'] text-[#BDD9F2]">
            This platform uses Polygon for transaction...
          </h2>
          <p className="mb-2 font-['Inknut_Antiqua'] text-[#BDD9F2] text-[20px]">
            Escrow contract deployed on chain makes sure that there are no malpractice or fraud being
            committed on the platform.
          </p>
          <p className="font-['Inknut_Antiqua'] text-[#BDD9F2] text-[20px]">
            Every user is granted loyalty points stored on chain for every job completed successfully,
            which play an important role in supporting the user finding their job or the perfect person
            for the job.
          </p>
        </div>
      </div>
      <div className="bg-[#1D2C40] text-white p-10 shadow-lg">
      </div>
    </>
  );
};

export default InfoCard;