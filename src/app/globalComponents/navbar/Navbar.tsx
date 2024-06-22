import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import userImage from '@public/public/images/user.png'
import {auth} from "@public/auth"
import SignOut from './SignOut'
export default async function Navbar() {

    const session = await auth();
    const user = session?.user;


  return (
    <div className="navbar bg-[#F0F0F0] px-14 py-1 fixed z-10">
        <div className="flex-1">
                <Image
                src="/images/logo.png"
                alt="logo"
                height={40}                    
                width={40} />
                    
            <div className='ml-5 text-black'>
                <Link href="/" className='border-b-2 border-[#2f5382] text-[#2f5382]'>Početna</Link>
                <Link href="/aboutUs" className='ml-5'>O nama</Link>
                <Link href="/help" className='ml-5'>Pomoć i podrška</Link>
                <Link href="/vetStations" className='ml-5'>Blog</Link>
                <Link href="/vetStations" className='ml-5'>Kontakt</Link>
            </div>
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
        <li className={user ? "block" : "hidden"}><Link href='/dashboard/ChoosePostType' className='mt-3 py-1 btn bg-[#2f5382] w-full rounded-full text-white'>Objavi oglas</Link></li>
        <li className={user ? "block" : "hidden"}><SignOut /></li>
      </ul>
    </div>
  </div>
</div>
  )
}
