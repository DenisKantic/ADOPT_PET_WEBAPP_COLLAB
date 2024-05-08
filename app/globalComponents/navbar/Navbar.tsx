import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {auth} from '@/auth'
import userImage from '../../../public/images/user.png'
import SignOut from './SignOut'

export default async function Navbar() {

    const session = await auth()
    const user = session?.user;


  return (
    <div className="navbar bg-[#F0F0F0] px-10 py-1 fixed">
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
                <Link href="/vetStations" className='ml-5'>Veterinarske stanice</Link>
            </div>
        </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex flex-col">
        <div className="w-10 rounded-full">
                <Image
                src={user?.image || userImage }
                alt="logo"
                height={50}
                width={50} 
                />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow menu menu-sm border-[1px] border-[#2f5382] dropdown-content bg-white rounded-box w-[250px]">
        <li>
          <p className='badge rounded-xl border-none bg-[#F0F0F0] text-black text-start flex flex-row justify-between my-2 py-5 px-4 text-md w-full'>
            {user ? "Moj profil" : <Link href="/login">Prijavi se</Link>}
            <span className={user ? "block py-1 px-3 badge-neutral rounded-full text-center bg-[#2f5382] text-white" : "hidden"}>{user?.name?.substring(0,10)+"..."}</span>
          </p>
        </li>
        <li className={user ? "block" : "hidden"}><Link href="/dashboard" className='my-2 badge rounded-xl border-none bg-[#F0F0F0] text-black text-start flex justify-start py-5 px-4 text-md w-full'>Dashboard</Link></li>
        <li className={user ? "block" : "hidden"}><a className='my-2 badge rounded-xl border-none bg-[#F0F0F0] text-black text-start flex justify-start py-5 px-4 text-md w-full'>Postavke</a></li>
        <li className={user ? "block" : "hidden"}><a className='mt-3 py-1 btn bg-[#2f5382] w-full rounded-full text-white'>Objavi oglas</a></li>
        <li className={user ? "block" : "hidden"}><SignOut /></li>
      </ul>
    </div>
  </div>
</div>
  )
}
