import React from "react";
import CardItem from "./globalComponents/CardItem";
import LostAnimals from "./globalComponents/LostAnimals";
import DonationPost from "./globalComponents/DonationPost";
import Link from "next/link";
import Image from "next/image";
import SecondNavigation from "./globalComponents/navbar/SecondNavigation";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
      <SecondNavigation />

      {/* hero section */}
      <div className="flex flex-row bg-[#2F5382] mt-4 rounded-sm">
        {/* left side */}
        <div className="w-[65%]">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="pl-3 mt-2"
          />
          <div className="text-[#fafafa] text-[44px] p-4 leading-10 font-bold">
            <h1 className="pb-3">PetConnect</h1>
            <h1>Bosnia and Herzegovina</h1>
          </div>
          <div className="text-[16px] text-[#fafafa] leading-5 px-4 font-normal py-2 opacity-60 mb-5">
            <p>
              PetConnect pomaže u udomljavanju i pružanju pomoći svim
              životinjama, kao i njihov pronalazak u slučaju izgubljenosti širom
              Bosne i Herzegovine.
            </p>
          </div>
        </div>

        {/* right side */}
        <div className="w-[35%] relative">
          <Image
            src="/images/white-shape.png"
            alt="white-shape"
            height={50}
            width={50}
            className="h-full w-full"
            unoptimized
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Image
              src="/images/instagram-logo.png"
              alt="face"
              width={10}
              height={10}
              className="h-full w-full text-[#2F5382]"
              unoptimized
            />
            <Image
              src="/images/facebook-logo.png"
              alt="face"
              width={12}
              height={12}
              className="h-full w-full text-[#2F5382]"
              unoptimized
            />
            <Image
              src="/images/linkedin-logo.png"
              alt="face"
              width={12}
              height={12}
              className="h-full w-full text-[#2F5382]"
              unoptimized
            />
          </div>
          <div className="relative">
            <Image
              src="/images/dog_hero_section.png"
              alt="hero-dog"
              height={50}
              width={50}
              className="h-40 w-40 absolute right-[3%] bottom-[30%]"
              unoptimized
            />
          </div>
        </div>
      </div>
      {/* end of hero section */}

      <div className="w-full overflow-hidden min-h-[10vh] rounded-2xl shadow-2xl border-[1px] border-[#2F5382] p-5 mt-20 mb-5 bg-white text-xl text-center text-white font-bold uppercase flex justify-center items-center">
        <p className="w-full xxs:text-sm md:text-xl md:mt-0 text-[#2F5382]">
          Web aplikacija je trenutno u beta {"(test)"} fazi i zbog toga su
          moguće manje greške. <br />
          Ukoliko primjetite grešku, molimo Vas da nam se javite na <br />
          <span className="xxs:text-[0.9em] md:text-2xl font-extrabold tracking-wide lowercase">
            contact@petconnectbosnia.com
          </span>
          <br />
        </p>
      </div>

      <div className="flex justify-between items-center pt-20 xxs:flex-row">
        <p className="xxs:text-md md:text-2xl">Udomi svog ljubimca</p>
        <Link
          href="/adoptPet"
          className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
        >
          Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div className="w-[90%] mx-auto h-[90%] my-5 p-5 rounded-xl flex flex-col justify-center items-center border-[1px] shadow-2xl border-[#2F5382]">
          <Image
            src="/images/logo.png"
            alt="logo"
            height={100}
            width={100}
            unoptimized
            className="w-full object-cover"
          />
          <p>Vaše mjesto za reklamu</p>
          <p>Kontaktirajte nas..</p>
        </div>
        <CardItem />
      </div>

      <div className="flex justify-between items-center pt-10 xxs:flex-row">
        <p className="xxs:text-sm md:text-2xl">Izgubljene zivotinje</p>
        <Link
          href="/lostPet"
          className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
        >
          Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sn:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {/* <LostAnimals/>  */}
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

      <div className="flex justify-between items-center pt-10 xxs:flex-row">
        <p className="xxs:text-md md:text-2xl">Donacije:</p>
        <Link
          href="/donationPost"
          className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
        >
          Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {/* <DonationPost/>  */}
      </div>
    </div>
  );
}
