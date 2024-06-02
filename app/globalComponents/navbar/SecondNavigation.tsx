import React from 'react'
import Link from 'next/link'
import { FaPaw } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaStethoscope } from "react-icons/fa";

export default function SecondNavigation() {
  return (
    <div className='xxs:hidden md:flex justify-center gap-10 items-center pt-20 w-full'>

     <div className='flex justify-center items-center flex-col'> 
        <div className='rounded-full p-5 bg-[#2F5382] text-white'>
           <FaPaw className='text-[2em]'/>
        </div>
        <Link href="/Building"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full mt-5
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Udomi zivotinju
        </Link>
    </div>

    <div className='flex justify-center items-center flex-col'> 
        <div className='rounded-full p-5 bg-[#2F5382] text-white'>
        <FaHandsHelping className='text-[2em]'/>
        </div>
        <Link href="/Building"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full mt-5
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Pomozi zivotinji
        </Link>
    </div>

    <div className='flex justify-center items-center flex-col'> 
        <div className='rounded-full p-5 bg-[#2F5382] text-white'>
           <FaSearch className='text-[2em]'/>
        </div>
        <Link href="/Building"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full mt-5
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Izgubljene zivotinje
        </Link>
    </div>

    <div className='flex justify-center items-center flex-col'> 
        <div className='rounded-full p-5 bg-[#2F5382] text-white'>
           <FaHandHoldingHeart className='text-[2em]'/>
        </div>
        <Link href="/Building"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full mt-5
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Donacijski oglasi
        </Link>
    </div>

    <div className='flex justify-center items-center flex-col'> 
        <div className='rounded-full p-5 bg-[#2F5382] text-white'>
           <FaStethoscope className='text-[2em]'/>
        </div>
        <Link href="/Building"  
        className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full mt-5
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
                                      Vet. stanice
        </Link>
    </div>
  </div>
  )
}
