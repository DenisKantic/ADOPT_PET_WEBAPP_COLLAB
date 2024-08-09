"use client" // error page has to be client, it's said in official docs
import Image from "next/image"
import Link from "next/link"

export default function ErrorPage(){
    return(
        <div className='h-screen flex-col flex justify-center items-center p-5 bg-[#e2e6ec] text-[#2F5382]'>
        <p className='text-2xl pb-5 font-bold text-center'>PetConnect</p>
            <Image
            src="/images/logo.png"
            alt='logo_image'
            height={50}
            width={50}
            unoptimized
            className='h-[30vh] object-cover w-auto pb-5'
            />
        <div className='text-center'>
            <p className='font-bold text-xl'>Error.</p>
            <p className='py-2'>Desila se neočekivana greška.</p> 
            <p>Molimo Vas da se obratite administratoru aplikacije.</p>
            <Link href="/" className="btn bg-[#2F5382] mt-5 rounded-full text-white
                                    hover:bg-white hover:text-[#2F5382]">
                                            Povratak na početnu</Link>
        </div>
    </div>
  )
}