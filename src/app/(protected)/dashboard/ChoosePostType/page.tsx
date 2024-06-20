import Link from 'next/link'
import React from 'react'

export default function ChoosePostType() {
  return (
    <div className='h-screen w-full bg-white flex justify-center items-center'>
      <div className='grid grid-cols-1 grid-rows-3 gap-5 xxs:w-[90%] md:w-[400px] shadow-2xl p-5'>
                <Link
                className='btn bg-white text-[#2F5382] border-[#2F5382] rounded-full w-full mt-5
                hover:bg-[#2F5382] hover:text-white text-xl'
                href="/dashboard/createAdoptPost"
                >Udomi zivotinju</Link>

                <Link
                className='btn bg-[#2F5382] border-[#2F5382] text-white rounded-full w-full mt-5
                hover:bg-white hover:text-[#2F5382] text-xl'
                href="/dashboard/CreateDonationPost"
                >Donacijski oglas</Link>

                <Link
                  className='btn bg-red-500 text-white border-[#2F5382] rounded-full w-full mt-5
                  hover:bg-[#2F5382] hover:text-white" text-xl'
                href="/dashboard/createLostPetPost"
                >Izgubljena zivotinja</Link>
      </div>
    </div>
  )
}
