import React from 'react'
import Link from 'next/link'

export default function SecondNavigation() {
  return (
    <div className="xxs:hidden md:flex justify-center items-center w-full bg-gray-300 h-[8svh]">
      <div className="md:w-full md:text-sm xl:text-xl xl:w-[90%] text-black font-bold w-[50%] flex justify-between gap-10 items-center text-center">
        <Link className="hover:text-[#2F5382]" href="/adoptPet">
          Udomi životinju
          <div className="border-t-2 mt-1 border-[#2F5382]"></div>
        </Link>
        <Link className="hover:text-[#2F5382]" href="/donationPost">
          Donacijski oglasi
          <div className="border-t-2 mt-1 border-[#2F5382]"></div>
        </Link>

        <Link className="hover:text-[#2F5382]" href="/vetStations">
          Veterinarske stanice
          <div className="border-t-2 mt-1 border-[#2F5382]"></div>
        </Link>
        <Link className="text-red-600" href="/lostPet">
          Izgubljene životinje
          <div className="border-t-2 mt-1 border-red-600"></div>
        </Link>
      </div>
    </div>
  )
}
