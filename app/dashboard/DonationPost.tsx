import React from 'react'
import {prisma} from "@/lib/prisma"
import { redirect } from 'next/navigation';
import getSession from "@/lib/getSession"
import Image from 'next/image';
import Link from 'next/link';
import CreateDonation from './CreateDonationPost/page'

export default async function DonationPost() {

    const session = await getSession()
    const user = session?.user;
    const userId = session?.user?.id;


    if(!user){
        redirect("/")
    }

    const oglasi = await prisma.donationPost.findMany({
      where:{
        post_id: userId
      }
    })

    const postCounter = oglasi.length;

  return (
    <div>
      <h1 className="text-xl text-black">Donacijski oglasi: <span className="text-md font-bold text-gray-700">{postCounter}</span></h1>
        <Link 
         href={`/dashboard/CreateDonationPost`}
        className="btn bg-white text-lg text-blue-600 rounded-full mt-5">Kreiraj donaciju</Link>
        <div className="grid grid-cols-4 gap-10">
          {oglasi.map(item=>(
        <div className="h-auto rounded-xl my-5 w-full pb-2" key={item.id}>
        <Image
            src="/images/dog_photo.jpg"
            alt={item.name}
            height={50}
            width={50}
            unoptimized
            className="object-cover rounded-2xl h-[20vh] bg-purple-400 w-full"
            />
              <div className="w-full">
                  <ul className="text-black mt-2 flex flex-col">
                      <li className="flex items-start">
                          <span>{item.name.substring(0,20)}{item.name.length > 10 ? "..." : ""}</span></li>
                      <li className="flex items-center"><span>Kategorija: {item.category}</span></li>
                      <li className="flex items-center"><span>Tel: {item.phoneNumber}</span></li>
                      <li className="flex items-center"><span>Zivotinja: {item.animalCategory}</span></li>

                  </ul>
                  <Link 
                  href={`/animalDetails/${item.id}`}
                  className="btn bg-white text-lg text-[#2F5382] border-[#2F5382] rounded-full w-full mt-5
                              hover:bg-[#2F5382] hover:text-white">Pogledaj detalje</Link>
                              <p className='text-sm text-center py-2 text-gray-600'>Objavljeno: {item.createdAt.toLocaleDateString('bs-BA',{
                                  year:'numeric',
                                  month: 'short',
                                  day: 'numeric'
                              })}</p>
              </div>
              </div> 
                    ))}
          
        </div>
    </div>
  )
}
