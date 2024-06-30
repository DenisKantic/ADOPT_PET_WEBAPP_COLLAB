import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import userImage from '@public/public/images/user.png'
import SignOut from './SignOut'
import { auth } from '@public/auth'
import MobileNavbar from './MobileNavbar'

export default async function Navbar() {

  const session = await auth();
  const user = session?.user;

  return (
    <div className="navbar bg-[#F0F0F0] shadow-xl xxs:px-2 lg:px-14 py-1 fixed z-10">
        <div className="xxs:justify-between flex-1 py-2">
               <Link href="/" className='xxs:hidden lg:block cursor-pointer'>
                  <Image
                  src="/images/logo.png"
                  alt="logo"
                  height={50}                    
                  width={50} />
                </Link>
                    
            <div className='ml-5 text-black xxs:hidden lg:inline-block w-full'>
                <Link href="/" className='border-b-2 border-[#2f5382] text-[#2f5382]'>Početna</Link>
                <Link href="/aboutUs" className='ml-5'>O nama</Link>
                <Link href="/help" className='ml-5'>Pomoć i podrška</Link>
                <Link href="/policy" className='ml-5'>Politika privatnosti</Link>
                <Link href="/vetStations" className='ml-5'>Blog</Link>
                <Link href="/vetStations" className='ml-5'>Kontakt</Link>
            </div>

            <MobileNavbar />
        </div>
  <div className="flex-none gap-2">
    <Link href="/login" 
    className={user ? "hidden" : "flex btn bg-[#2F5382] rounded-full text-white px-6 hover:bg-white hover:text-[#2F5382]"}
    >
      Prijavi se
    </Link>
    <div className={ user ? "dropdown dropdown-end" : "hidden"}>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex flex-col">
        <div className="w-10 rounded-full">
                <Image
                src={user?.image || userImage }
                alt="logo"
                height={50}
                width={50} 
                priority
                />
        </div>
      </div>
     <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow menu menu-sm border-[1px] border-[#2f5382] dropdown-content bg-white rounded-box w-[250px]">
        <li>
          <Link href="/dashboard" className='badge rounded-xl border-none bg-[#F0F0F0] text-black text-start flex flex-row justify-between my-2 py-5 px-4 text-md w-full'>
            <span>Moj profil</span>
            <span className="block py-1 px-3 badge-neutral rounded-full text-center bg-[#2f5382] text-white">
              {user?.name?.substring(0,10)+"..."}
            </span>
          </Link>
        </li>
        <li className={user ? "block" : "hidden"}>
            <Link className='my-2 badge rounded-xl border-none bg-[#F0F0F0] text-black text-start 
          flex justify-start py-5 px-4 text-md w-full' href="/profile-settings">Postavke</Link>
        </li>
        <li className={user ? "block" : "hidden"}><Link href='/dashboard' className='mt-3 py-1 btn bg-[#2f5382] w-full rounded-full text-white'>Objavi oglas</Link></li>
        <li className={user ? "block" : "hidden"}><SignOut /></li>
      </ul>
    </div>
  </div>
</div>
  )
}

{/* <div className={ nav ? 'bg-black/80 w-full fixed h-screen z-10 top-0 left-0 duration-200' : 'fixed'}>
<div className={nav ? 'bg-white w-[280px] fixed top-0 left-0 z-10 h-screen duration-200' : 'fixed left-[-100%] w-[-300px] top-0 duration-300'}>
<AiOutlineClose className='absolute top-4 right-4 cursor-pointer' 
            onClick={()=> setNav(!nav)}  size={30}></AiOutlineClose> 
            <h1 className='text-xl text-[#354a67] p-4'>Reset Inžinjering</h1>


            <ul className='flex flex-col items-start p-4 text-black text-lg mt-[50px]'>
    <li className='mr-2 flex items-center py-2'><AiOutlineHome size={22} className='mr-5'/><a href="#home" onClick={()=> setNav(!nav)}>POČETNA</a></li>
    <li className='mr-2 flex items-center py-2'><AiOutlineInfoCircle size={22} className='mr-5' /><a href="#aboutUs" onClick={()=> setNav(!nav)}>O NAMA</a></li>
    <li className='mr-2 flex items-center py-2'><AiOutlineShoppingCart size={22} className='mr-5' /><a href="#products" onClick={()=> setNav(!nav)}>PROIZVODI</a></li>
    <li className='mr-2 flex items-center py-2'><AiOutlinePhone  size={22} className='mr-5'/><a href="#contact" onClick={()=> setNav(!nav)}>KONTAKT</a></li>
   </ul>


</div>
</div> */}

