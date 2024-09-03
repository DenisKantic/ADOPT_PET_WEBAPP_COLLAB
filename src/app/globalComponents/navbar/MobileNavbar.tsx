'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { IoIosDocument } from 'react-icons/io'
import { IoMdSettings } from 'react-icons/io'
import petLogo from '@public/public/images/logo.png'
import Image from 'next/image'
import Logout from './Logout'

interface MobileNavbarProps {
  isAuthenticated: boolean
  username: string
}

export default function MobileNavbar({
  isAuthenticated,
  username,
}: MobileNavbarProps) {
  const [nav, setNav] = useState(false)
  const [navMob, setNavMob] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  const handleNavMob = () => {
    setNavMob(!navMob)
  }

  const usernameLength = (username: string) => {
    if (username.length > 10) {
      return username.substring(0, 10)
    } else {
      return username
    }
  }

  return (
    <div className="xxs:flex md:hidden z-10 bg-gray-200">
      <div className="flex justify-between items-center flex-row w-full p-5 h-[7svh] z-10  overflow-y-scroll">
        <AiOutlineMenu
          size={30}
          onClick={handleNav}
          className="cursor-pointer"
        />
        <p>PetConnect</p>
        <Image
          alt="logo"
          height={30}
          width={30}
          src={petLogo}
          onClick={handleNav}
          className="cursor-pointer object-contain"
        />
      </div>
      <div
        className={
          nav
            ? 'bg-black/80 w-full fixed h-screen z-10 top-0 left-0 duration-200'
            : 'fixed z-10'
        }
      >
        <div
          className={
            nav
              ? 'bg-white w-[280px] fixed top-0 left-0 z-10 h-screen duration-200 overflow-y-scroll'
              : 'fixed left-[-100%] w-[-300px] top-0 duration-300'
          }
        >
          <AiOutlineClose
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleNav}
            size={30}
          />
          <h1 className="text-xl text-[#354a67] p-4">Pet Connect</h1>
          <ul className="flex flex-col items-start p-4 text-black pl-5 text-lg mt-[50px]">
            <li className=" w-full text-center text-xl">
              <Link
                onClick={handleNav}
                href="/login"
                className={
                  isAuthenticated
                    ? 'hidden'
                    : 'flex btn bg-[#2F5382] mb-5 rounded-full text-white px-6 hover:bg-white hover:text-[#2F5382]'
                }
              >
                Prijavi se
              </Link>
              <span
                onClick={handleNavMob}
                className={
                  isAuthenticated
                    ? 'block py-2 mb-5 w-full badge-neutral rounded-full text-center bg-[#2f5382] text-white'
                    : 'hidden'
                }
              >
                {usernameLength(username)}
              </span>

              {navMob && (
                <ul className="w-full mb-5">
                  <li>
                    <Link
                      onClick={handleNav}
                      href="/dashboard"
                      className="badge rounded-xl border-none bg-[#F0F0F0] text-black text-start flex flex-row justify-start my-2 py-5 px-4 text-md w-full"
                    >
                      <IoIosDocument size={20} className="text-[#2f5382]" />
                      Moji oglasi
                    </Link>
                  </li>
                  <li className={isAuthenticated ? 'block' : 'hidden'}>
                    <Link
                      onClick={handleNav}
                      className="my-2 badge rounded-xl border-none bg-[#F0F0F0] text-black text-start 
                    flex flex-row justify-start py-5 px-4 text-md w-full"
                      href="/dashboard/profile-settings"
                    >
                      <IoMdSettings size={20} className="text-[#2f5382]" />
                      Postavke
                    </Link>
                  </li>
                  <li className={isAuthenticated ? 'block' : 'hidden'}>
                    <Link
                      onClick={handleNav}
                      href="/dashboard"
                      className="mt-3 py-1 btn text-[#2f5382] border-[#2f5382] w-full rounded-full bg-white hover:text-white hover:bg-[#2f5382]"
                    >
                      Kreiraj oglas
                    </Link>
                  </li>
                  <li className="border-b-4 border-[#2f5382] mt-5"></li>
                </ul>
              )}
            </li>
            <li
              className="mr-2 border-[1px] mb-5 border-[#2f5382] w-full rounded-xl text-center flex justify-center items-center py-2"
              onClick={handleNav}
            >
              <Link href="/adoptPet">Udomi životinju</Link>
            </li>
            <li
              className="mr-2 flex items-center mb-5 w-full py-2 border-[1px] border-[#2f5382] rounded-xl justify-center"
              onClick={handleNav}
            >
              <Link href="/lostPet">Izgubljene životinje</Link>
            </li>
            <li
              className="mr-2 flex items-center w-full py-2 border-[1px] border-[#2f5382] rounded-xl justify-center"
              onClick={handleNav}
            >
              <Link href="/donationPost">Donacijski oglasi</Link>
            </li>
            <li className="mr-2 flex items-center py-2" onClick={handleNav}>
              <Link href="/">POČETNA</Link>
            </li>
            <li className="mr-2 flex items-center py-2" onClick={handleNav}>
              <Link href="/aboutUs">O NAMA</Link>
            </li>
            <li className="mr-2 flex items-center py-2" onClick={handleNav}>
              <Link href="/">POMOĆ I PODRŠKA</Link>
            </li>
            <li className="mr-2 flex items-center py-2" onClick={handleNav}>
              <Link href="/aboutUs">POLITIKA PRIVATNOSTI</Link>
            </li>
            <li className="mr-2 flex items-center py-2" onClick={handleNav}>
              <Link href="/">BLOG</Link>
            </li>
            <li className="mr-2 flex items-center py-2" onClick={handleNav}>
              <Link href="/aboutUs">KONTAKT</Link>
            </li>
            <Logout />
          </ul>
        </div>
      </div>
    </div>
  )
}
