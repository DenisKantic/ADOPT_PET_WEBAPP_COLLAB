import React from "react";
import Link from "next/link";

export default function SecondNavigation() {
  return (
    <div className="xxs:hidden md:flex justify-center md:gap-2 xl:gap-5 items-center pt-16 pb-3 w-full">
      <div className="flex justify-center items-center flex-col">
        <Link
          href="/adoptPet"
          className="px-6 md:text-center md:py-6 lg:py-4 text-[16px] 
          text-[#000000] mt-5 font-normal hover:text-[#2F5382]"
        >
          Udomi ljubimca
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col">
        <Link
          href="/lostPet"
          className="px-6 md:text-center md:py-6 lg:py-4 text-[16px]
          text-[#000000] mt-5 font-normal hover:text-[#2F5382]"
        >
          Izgubljene zivotinje
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col">
        <Link
          href="/donationPost"
          className="px-6 md:text-center md:py-6 lg:py-4 text-[16px] 
          text-[#000000] mt-5 font-normal hover:text-[#2F5382]"
        >
          Donacijski oglasi
        </Link>
      </div>

      <div className="flex justify-center items-center flex-col">
        <Link
          href="/Building"
          className="px-6 md:text-center md:py-6 lg:py-4 text-[16px] 
          text-[#000000] mt-5 font-normal hover:text-[#2F5382]"
        >
          Veterinarske stanice
        </Link>
      </div>
    </div>
  );
}
