'use server'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import userImage from '@public/public/images/user.png'
import axios from 'axios'
import { cookies } from 'next/headers'
import Logout from './Logout'
import { revalidatePath } from 'next/cache'
import { IoIosDocument } from 'react-icons/io'
import { IoMdSettings } from 'react-icons/io'
import MobileNavbar from './MobileNavbar'

export default async function Navbar() {
  const usernameLength = (username: string) => {
    if (username.length > 10) {
      return username.substring(0, 10)
    } else {
      return username
    }
  }

  const cookie = cookies().get('token')?.value

  let isAuthenticated = false
  let username = ''

  try {
    const response = await axios.get('http://localhost:8080/checkAuth', {
      headers: {
        Cookie: `token=${cookie}`,
      },
      withCredentials: true,
    })

    if (response.status === 200) {
      isAuthenticated = true
      username = response.data.username
      revalidatePath('/dashboard')
    }
  } catch (error) {
    console.log('SHIT HAPPENS')
  }

  return (
    <div className="fixed z-50 w-full shadow-lg">
      <div className="navbar h-[7svh] bg-[#F0F0F0] xxs:px-2 md:px-14 py-1 xxs:hidden md:flex">
        <div className="flex-1 xxs:justify-between md:justify-start">
          <Link href="/" className="xxs:hidden md:flex cursor-pointer">
            <Image src="/images/logo.png" alt="logo" height={40} width={40} />
          </Link>

          <div className="ml-5 text-black">
            <Link
              href="/"
              className="border-b-2 border-[#2f5382] text-[#2f5382]"
            >
              Početna
            </Link>
            <Link href="/aboutUs" className="ml-5">
              O nama
            </Link>
            <Link href="/help" className="ml-5">
              Pomoć i podrška
            </Link>
            <Link href="/policy" className="ml-5">
              Politika privatnosti
            </Link>
            <Link href="/vetStations" className="ml-5">
              Blog
            </Link>
            <Link href="/vetStations" className="ml-5">
              Kontakt
            </Link>
          </div>
        </div>
        <div className="flex-none gap-2 z-50">
          <Link
            href="/login"
            className={
              isAuthenticated
                ? 'hidden'
                : 'flex btn bg-[#2F5382] rounded-full text-white px-6 hover:bg-white hover:text-[#2F5382]'
            }
          >
            Prijavi se
          </Link>
          <div className={isAuthenticated ? 'dropdown dropdown-end' : 'hidden'}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar flex flex-col"
            >
              <div className="w-10 rounded-full">
                <Image
                  src={userImage}
                  alt="logo"
                  height={50}
                  width={50}
                  priority
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-4 shadow menu menu-sm border-[1px] border-[#2f5382] dropdown-content bg-white rounded-box w-[250px]"
            >
              <span className="block py-2 px-3 badge-neutral rounded-full text-start bg-[#2f5382] text-white">
                {usernameLength(username)}
              </span>
              <li>
                <Link
                  href="/dashboard"
                  className="badge rounded-xl border-none bg-[#F0F0F0] text-black text-start flex flex-row justify-start my-2 py-5 px-4 text-md w-full"
                >
                  <IoIosDocument size={20} className="text-[#2f5382]" />
                  Moji oglasi
                </Link>
              </li>
              <li className={isAuthenticated ? 'block' : 'hidden'}>
                <Link
                  className="my-2 badge rounded-xl border-none bg-[#F0F0F0] text-black text-start 
          flex justify-start py-5 px-4 text-md w-full"
                  href="/dashboard/profile-settings"
                >
                  <IoMdSettings size={20} className="text-[#2f5382]" />
                  Postavke
                </Link>
              </li>
              <li className={isAuthenticated ? 'block' : 'hidden'}>
                <Link
                  href="/dashboard"
                  className="mt-3 py-1 btn text-[#2f5382] border-[#2f5382] w-full rounded-full bg-white hover:text-white hover:bg-[#2f5382]"
                >
                  Kreiraj oglas
                </Link>
              </li>
              <Logout />
            </ul>
          </div>
        </div>
      </div>
      <MobileNavbar isAuthenticated={isAuthenticated} username={username} />
    </div>
  )
}
