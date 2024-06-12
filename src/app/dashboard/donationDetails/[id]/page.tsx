import React, { cache } from 'react'
import type { Metadata } from 'next'
import { authOptions } from '@/lib/AuthOptions'
import { getServerSession } from 'next-auth'
import { notFound} from 'next/navigation'
import {prisma} from '@/lib/prisma'
import Image from 'next/image'
import { MdOutlinePets } from "react-icons/md";
import { PiSyringe } from "react-icons/pi";
import { GrCircleInformation } from "react-icons/gr";


export const metadata: Metadata = {
    title: "Donacijski Oglas",
  };



type Props = {
    params:{
        id:string
    }
}


const getDonation = cache(async (id: string)=>{
    const donation = await prisma.donationPost.findUnique({where: {id}})
    
    if(!donation) notFound();
    
    return donation;
})

const usernameLenght = (user:string)=>{
    if(user.length > 15){
        return user.substring(0,15) + "...";
    } else {
        return user;
    }
}

export default async function DonationDetails({params: {id}} : Props) {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    const donation = await getDonation(id)

  return (
    <div className='min-h-screen xxs:px-4 md:px-14 bg-white'>

            <p className='pt-20 text-[#2F5382] text-xl font-bold'>{donation.name.toUpperCase()}</p>
        <div className='h-full w-full mx-auto flex gap-10 justify-between py-5
                        xxs:flex-col xl:flex-row'>
            <div className='w-full'>
                <Image
                src="/images/dog_photo.jpg"
                alt={donation.name}
                height={50}
                width={50}
                unoptimized
                className="object-cover rounded-2xl h-[60vh] w-full"
                />
                
                    <div className='grid grid-rows-2 gap-10 w-full py-5 xxs:grid-cols-1 md:grid-cols-2'>
                       
                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                 <MdOutlinePets/>
                                <span className='ml-2'>Ime</span>
                            </div>
                            <div>
                                <span className='font-bold text-[#2F5382]'>{donation.name}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                <PiSyringe />
                                <span className='ml-2'>Kategorija</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>{donation.category}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                            <GrCircleInformation />
                                <span className='ml-2'>Za</span>
                            </div>
                            <div>
                                <span className='font-bold text-[#2F5382]'>{donation.animalCategory}</span>
                            </div>
                        </div>


                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                <span className='ml-2'>Lokacija</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>Sarajevo</span>
                            </div>
                        </div>
                </div>
                <p className='text-xl text-[#2F5382] pb-5 font-bold'>Detaljan opis:</p>
                <div className='w-full shadow-2xl min-h-[10vh]'>
                        <textarea value={donation.description} className='w-full p-3 rounded-2xl h-[40vh] text-lg bg-white resize-none text-gray-800 overflow-hidden' disabled />
                    </div>
                

            </div>

            <div className='xxs:w-full md:w-[30%] h-full rounded-2xl shadow-2xl'>
                 <div className='w-full h-full p-5 flex flex-col justify-between items-start text-black'>
                    <p className='py-2 text-[#2F5382]'>Ime korisnika: <span className='text-black'>{usernameLenght(donation.username)}</span></p>
                    <p className='pb-2 text-[#2F5382]'>Broj telefona: <span className='text-black'>{donation.phoneNumber}</span></p>
                    <p className='pb-5 text-[#2F5382]'>Kreirano: <span className='text-black'>{donation.createdAt.toLocaleDateString('bs-BA',{
                                            year:'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</span></p>

                        <div className={ (user?.id == donation.post_id) ? 'w-full flex flex-col justify-between gap-5 pt-5' : "hidden"}>
                            <button className="btn bg-[#2F5382] text-lg text-white rounded-full w-full mt-5
                                        hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">Uredi oglas</button>
                            <button>Delete</button>
                        </div>
                 </div>

                 <div className='w-[90%] h-[90%] text-black mt-10 mx-auto p-5 rounded-xl flex flex-col justify-center items-center'>
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

            </div>

        </div>
      
    </div>
  )
}
