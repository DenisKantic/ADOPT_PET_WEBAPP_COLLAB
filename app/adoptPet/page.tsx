import React from 'react'
import CardItem from '../globalComponents/CardItem'
import Image from 'next/image'

export default function AdoptPets() {
  return (
    <div className="min-h-screen bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">

        <div className="grid pt-20 gap-10 xxs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
        <div className='w-[90%] h-[90%] my-5 p-5 rounded-xl flex flex-col justify-center items-center border-[1px] shadow-2xl border-[#2F5382]'>
          <Image
          src="/images/logo.png"
          alt="logo"
          height={100}
          width={100}
          unoptimized
          className='w-full object-cover'
          />
          <p>Vaše mjesto za reklamu</p>
          <p>Kontaktirajte nas..</p>
          </div>
          <CardItem/> 
      </div>
    </div>
  )
}
