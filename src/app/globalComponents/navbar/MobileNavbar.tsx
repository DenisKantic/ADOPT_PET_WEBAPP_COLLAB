"use client"
import React, {useState} from 'react'
import {AiOutlineMenu,AiOutlineClose,AiOutlineHome,AiOutlineInfoCircle, AiOutlineShoppingCart, AiOutlinePhone} from 'react-icons/ai';
import Link from 'next/link'
import Image from "next/image"
import { FaPaw } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaStethoscope } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { MdPolicy } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";



export default function MobileNavbar() {

    const [nav,setNav]=useState(false);

  return (
    <div className='ml-5 text-black w-full lg:hidden'>
        <div className='w-full mx-auto flex justify-between'>
        <AiOutlineMenu className='mr-2 cursor-pointer lg:hidden' size={35} onClick={()=> setNav(!nav)}></AiOutlineMenu>
        <div className={ nav ? 'bg-black/80 w-full fixed h-screen z-10 top-0 left-0 duration-200' : 'fixed'}>
        <div className={nav ? 'bg-white w-[280px] fixed top-0 left-0 z-10 h-screen duration-200' : 'fixed left-[-100%] w-[-300px] top-0 duration-300'}>
        <AiOutlineClose className='absolute top-4 right-4 cursor-pointer' 
                    onClick={()=> setNav(!nav)}  size={30}></AiOutlineClose> 
                    <h1 className='text-xl text-[#354a67] p-4'>PetConnect Bosnia</h1>


                    <ul className='flex flex-col items-start p-4 text-black text-lg mt-5'>
            <li className='mr-2 flex items-center py-2'><AiOutlineHome size={22} className='mr-5 text-[#2F5382]'/><Link href="." onClick={()=> setNav(!nav)}>POČETNA</Link></li>
            <li className='mr-2 flex items-center py-2'><FaPaw size={22} className='mr-5 text-[#2F5382]' /><Link href="/adoptPet" onClick={()=> setNav(!nav)}>Udomi životinju</Link></li>
            <li className='mr-2 flex items-center py-2'><FaHandsHelping size={22} className='mr-5 text-[#2F5382]' /><Link href="/Building" onClick={()=> setNav(!nav)}>Pomozi životinji</Link></li>
            <li className='mr-2 flex items-center py-2'><FaSearch size={22} className='mr-5 text-[#2F5382]' /><Link href="/lostPet" onClick={()=> setNav(!nav)}>Izgubljene životinje</Link></li>
            <li className='mr-2 flex items-center py-2'><FaHandHoldingHeart size={22} className='mr-5 text-[#2F5382]' /><Link href="/donationPost" onClick={()=> setNav(!nav)}>Donacije</Link></li>
            <li className='mr-2 flex items-center py-2'><FaStethoscope size={22} className='mr-5 text-[#2F5382]' /><Link href="/Building" onClick={()=> setNav(!nav)}>Vet. stanice</Link></li>



            <li className='mr-2 flex items-center py-2'><AiOutlineInfoCircle size={22} className='mr-5 text-[#2F5382]' /><Link href="/aboutUs" onClick={()=> setNav(!nav)}>O nama</Link></li>
            <li className='mr-2 flex items-center py-2'><IoMdHelp size={22} className='mr-5 text-[#2F5382]' /><Link href="/help" onClick={()=> setNav(!nav)}>Pomoć i podrška</Link></li>
            <li className='mr-2 flex items-center py-2'><MdPolicy   size={22} className='mr-5 text-[#2F5382]'/><Link href="/policy" onClick={()=> setNav(!nav)}>Politika privatnosti</Link></li>
            <li className='mr-2 flex items-center py-2'><IoNewspaperOutline  size={22} className='mr-5 text-[#2F5382]'/><Link href="/Building" onClick={()=> setNav(!nav)}>Blog</Link></li>
            <li className='mr-2 flex items-center py-2'><AiOutlinePhone  size={22} className='mr-5 text-[#2F5382]'/><Link href="/Building" onClick={()=> setNav(!nav)}>Kontakt</Link></li>


           </ul>

        </div>
        </div>
        </div>
</div>
  )
}
