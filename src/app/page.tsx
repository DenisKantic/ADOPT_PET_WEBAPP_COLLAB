import React from 'react';
import CardItem from './globalComponents/CardItem';
import LostAnimals from './globalComponents/LostAnimals';
import DonationPost from './globalComponents/DonationPost';
import Link from 'next/link';
import Image from 'next/image';
import SecondNavigation from './globalComponents/navbar/SecondNavigation';


export default function Home() {


  return (
    <div className="min-h-screen overflow-hidden bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
      
     <SecondNavigation />

     <div className='w-full overflow-hidden min-h-[10vh] rounded-2xl shadow-2xl border-[1px] border-[#2F5382] p-5 mt-20 mb-5 bg-white text-xl text-center text-white font-bold uppercase flex justify-center items-center'>
        <p className='w-full xxs:text-sm md:text-xl md:mt-0 text-[#2F5382]'>Web aplikacija je trenutno u beta {"(test)"} fazi i zbog toga su moguće manje greške. <br /> 
          Ukoliko primjetite grešku, molimo Vas da nam se javite na  <br /> 
          <span className='xxs:text-[0.9em] md:text-2xl font-extrabold tracking-wide lowercase'>contact@petconnectbosnia.com</span><br />
        </p>
     </div>

    
     <div className='flex justify-between items-center pt-20 xxs:flex-row'>
        <p className='xxs:text-md md:text-2xl'>Udomi svog ljubimca</p>
        <Link href="/adoptPet"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className='w-[90%] mx-auto h-[90%] my-5 p-5 rounded-xl flex flex-col justify-center items-center border-[1px] shadow-2xl border-[#2F5382]'>
          <Image
          src="/images/logo.png"
          alt="logo"
          height={100}
          width={100}
          unoptimized
          className='w-full object-cover'
          />
          <p>Vaše mjesto za reklamu</p>
          <p>Kontaktirajte nas..</p>
          </div>
          <CardItem/> 
      </div>

      <div className='flex justify-between items-center pt-10 xxs:flex-row'>
        <p className='xxs:text-sm md:text-2xl'>Izgubljene zivotinje</p>
        <Link href="/lostPet"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sn:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <LostAnimals/> 
      </div>

      {/* <div className='flex justify-between items-center pt-10 xxs:flex-row'>
        <p className='xxs:text-md md:text-2xl'>Pomozi zivotinji:</p>
        <Link href="/Building"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          <CardItem/> 
      </div> */}

      <div className='flex justify-between items-center pt-10 xxs:flex-row'>
        <p className='xxs:text-md md:text-2xl'>Donacije:</p>
        <Link href="/donationPost"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <DonationPost/> 
      </div>

      
    </div>
  );
}