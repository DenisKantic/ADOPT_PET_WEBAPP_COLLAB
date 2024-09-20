import React from 'react'
import Link from 'next/link'

export default function SecondNavigation() {
  return (
    <div className="xxs:hidden md:flex justify-center items-center w-full fixed bg-[#2F5382] py-5 z-20">
      <div className="md:w-full md:text-sm xl:text-lg px-14 text-white w-[50%] flex justify-start gap-10 items-center text-center">
        <Link className="hover:text-[#2F5382]" href="/adoptPet">
          Udomi životinju
        </Link>
        <Link className="hover:text-[#2F5382]" href="/donationPost">
          Donacijski oglasi
        </Link>

        <Link className="hover:text-[#2F5382]" href="/vetStations">
          Veterinarske stanice
        </Link>
        <Link className="" href="/lostPet">
          Izgubljene životinje
        </Link>
      </div>
    </div>
  )
}
