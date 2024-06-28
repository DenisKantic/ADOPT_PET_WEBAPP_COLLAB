"use client"
import React, {useState} from 'react'
import {AiOutlineMenu,AiOutlineClose,AiOutlineHome,AiOutlineInfoCircle, AiOutlineShoppingCart, AiOutlinePhone} from 'react-icons/ai';
import Link from 'next/link'



export default function MobileNavbar() {

    const [nav,setNav]=useState(false);

  return (
    <div className='ml-5 text-black w-full bg-red-400'>
        <div className='w-full mx-auto flex justify-between'>
        <div className='xss:w-full flex md:w-auto'>
      
        <AiOutlineMenu className='mr-2 cursor-pointer md:hidden' size={25} onClick={()=> setNav(!nav)}></AiOutlineMenu>
        <div className={ nav ? 'bg-black/80 w-full fixed h-screen z-10 top-0 left-0 duration-200' : 'fixed'}>
        <div className={nav ? 'bg-white w-[280px] fixed top-0 left-0 z-10 h-screen duration-200' : 'fixed left-[-100%] w-[-300px] top-0 duration-300'}>
        <AiOutlineClose className='absolute top-4 right-4 cursor-pointer' 
                    onClick={()=> setNav(!nav)}  size={30}></AiOutlineClose> 
                    <h1 className='text-xl text-[#354a67] p-4'>PetConnect Bosnia</h1>


                    <ul className='flex flex-col items-start p-4 text-black text-lg mt-[50px]'>
            <li className='mr-2 flex items-center py-2'><AiOutlineHome size={22} className='mr-5'/><a href="#home" onClick={()=> setNav(!nav)}>POČETNA</a></li>
            <li className='mr-2 flex items-center py-2'><AiOutlineInfoCircle size={22} className='mr-5' /><a href="#aboutUs" onClick={()=> setNav(!nav)}>O NAMA</a></li>
            <li className='mr-2 flex items-center py-2'><AiOutlineShoppingCart size={22} className='mr-5' /><a href="#products" onClick={()=> setNav(!nav)}>PROIZVODI</a></li>
            <li className='mr-2 flex items-center py-2'><AiOutlinePhone  size={22} className='mr-5'/><a href="#contact" onClick={()=> setNav(!nav)}>KONTAKT</a></li>
           </ul>


        </div>
        </div>
        </div>
        </div>
</div>
  )
}
