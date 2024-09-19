'use server'
import React from 'react'
import CardItem from './globalComponents/CardItem'
import Link from 'next/link'
import Image from 'next/image'
import SecondNavigation from './globalComponents/navbar/SecondNavigation'
import LostPet from './globalComponents/LostPet'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import './bgcss.css'
import DonationPost from './globalComponents/DonationPost'

export default async function Home() {
  return (
    <div className="min-h-[100svh] overflow-hidden bg-[#f1f4f5] w-full text-black">
      <SecondNavigation />
      {/* hero section */}
      {/* <div className="flex justify-between bg-[#2F5382] rounded-b-xl rounded-sm xxs:mt-5 md:mt-0 xxs:min-h-[30svh]"> */}
      {/* left side */}
      {/* <div className="flex flex-col justify-center items-start xxs:w-full xl:w-[60%] p-5 overflow-hidden">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={60}
            height={60}
            className="py-2 xxs:mx-auto xl:mx-0"
          />
          <div className="text-[#fafafa] xxs:text-center w-full md:text-left  p-4 leading-10 font-bold xxs:text-lg md:text-2xl xxl:text-6xl">
            <h1 className="pb-3 xxs:text-center xl:text-left">PetConnect</h1>
            <h1 className="xxs:text-center xl:text-left">
              Bosna i Hercegovina
            </h1>
          </div>
          <div className="text-[#fafafa] leading-5 px-4 font-normal py-2 opacity-60 mb-5 xxs:text-sm xxs:text-center md:text-lg md:text-left">
            <p>
              PetConnect pomaže u udomljavanju, objavljivanju donacijskih stvari
              kao što su hrana, oprema i drugo,pružanju pomoći svim životinjama,
              kao i njihov pronalazak u slučaju izgubljenosti širom Bosne i
              Hercegovine.
            </p>

            <div className="xxs:block xl:hidden">
              <p className="mt-5 text-center">Pratite nas na:</p>
              <div className="flex flex-row items-center justify-center gap-5">
                <Link href="/">
                  <FaFacebookSquare
                    className="hover:text-[#2F5382]"
                    size={30}
                  />
                </Link>
                <Link href="/">
                  <FaInstagram className="hover:text-[#2F5382]" size={30} />
                </Link>
                <Link href="/">
                  <FaFacebookSquare
                    className="hover:text-[#2F5382]"
                    size={30}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div> */}

      {/* right side */}
      {/* <div className="w-[40%] min-h-[30svh] flex flex-col items-center justify-center bg-white overflow-hidden clip-path xxs:hidden xl:flex"> */}
      {/* Content */}
      {/* <div className="relative z-10">
            <Image
              src="/images/logo.png"
              alt="hero-dog"
              height={50}
              width={50}
              className="h-40 w-40 right-[3%] bottom-[30%]"
              unoptimized
            />
            <p className="text-center">Pratite nas na:</p>
            <div className="flex flex-row items-center justify-center gap-5">
              <Link href="/">
                <FaFacebookSquare className="hover:text-[#2F5382]" size={30} />
              </Link>
              <Link href="/">
                <FaInstagram className="hover:text-[#2F5382]" size={30} />
              </Link>
              <Link href="/">
                <FaFacebookSquare className="hover:text-[#2F5382]" size={30} />
              </Link>
            </div>
          </div>
        </div>
      </div> */}
      {/* end of hero section */}

      <div className="flex justify-between items-center pt-20 xxs:flex-row xxs:px-5 md:px-14">
        <p className="xxs:text-md md:text-2xl font-bold text-[#2F5382]">
          Udomi svog ljubimca
        </p>
        <Link
          href="/adoptPet"
          // className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
          //                           hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
          className="text-[#2F5382] underline"
        >
          Pregledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 xxs:px-5 md:px-14">
        <CardItem />
      </div>

      <div
        className="relative w-full xxs:min-h-[20svh] overflow-hidden bg-center bg-contain bg-repeat-y  mt-20"
        style={{
          backgroundImage: "url('images/blue_bg_picture.svg')",
          backgroundSize: 'cover',
        }}
      >
        <p className="py-5 absolute inset-0 h-full min-h-[20svh] xxs:w-[90%] sm:w-[60%] xxs:text-sm mx-auto text-center flex flex-col items-center justify-center text-white md:text-xl">
          <span className="font-bold">Podrži našu misiju!</span> <br />
          Hvala što koristiš našu aplikaciju za pomoć pri udomljavanju
          životinja. Svaka donacija pomaže nam da unaprijedimo platformu,
          podržimo rad s volonterima i omogućimo još bolju brigu za napuštene
          ljubimce. Uz tvoju podršku, možemo zajedno mijenjati živote životinja
          i ljudi. Svaka pomoć je važna!
        </p>
      </div>

      {/* <div className="flex justify-between items-center pt-10 xxs:flex-row">
        <p className="xxs:text-sm md:text-2xl">Izgubljene životinje</p>
        <Link
          href="/lostPet"
          className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
        >
          Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        <LostPet />
      </div>

      <div className="flex justify-between items-center pt-10 xxs:flex-row">
        <p className="xxs:text-md md:text-2xl">Donacije:</p>
        <Link
          href="/donationPost"
          className="badge py-4 px-4 bg-[#2F5382] text-md text-white rounded-full
                                    hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
        >
          Pogledaj sve
        </Link>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
        <DonationPost />
      </div> */}
    </div>
  )
}
