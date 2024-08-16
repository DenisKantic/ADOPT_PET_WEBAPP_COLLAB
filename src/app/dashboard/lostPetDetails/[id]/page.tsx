import React, { cache } from 'react'
import type { Metadata } from 'next'
import { auth } from '@public/auth'
import { notFound} from 'next/navigation'
import { db } from '@public/lib/db'
import Image from 'next/image'
import { MdOutlinePets } from "react-icons/md";
import { PiSyringe } from "react-icons/pi";
import { GrCircleInformation } from "react-icons/gr";
import Image404 from "@public/public/images/image404.jpg"
import DeleteButton from './DeleteAnimal'
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";


export const metadata: Metadata = {
    title: "Donacijski Oglas",
  };



type Props = {
    params:{
        id:string
    }
}


const getLostPet = cache(async (id: string)=>{
    const lostPet = await db.lostPetPost.findUnique({where: {id}})
    
    if(!lostPet) notFound();
    
    return lostPet;
})

const usernameLenght = (user:string)=>{
    if(user.length > 15){
        return user.substring(0,15) + "...";
    } else {
        return user;
    }
}

export default async function lostPetDetails({params: {id}} : Props) {

    const session = await auth()
    const user = session?.user;

    const lostPet = await getLostPet(id)

  return (
    <div className='min-h-screen xxs:px-4 md:px-14 bg-white'>

            <p className='pt-20 text-[#2F5382] text-xl font-bold'>{lostPet.name.toUpperCase()}</p>
        <div className='h-full w-full mx-auto flex gap-10 justify-between py-5
                        xxs:flex-col xl:flex-row'>
            <div className='w-full'>
                <Image
                src={`${lostPet.imageUrls[0]}` || Image404}
                alt={lostPet.name}
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
                                <span className='font-bold text-[#2F5382]'>{lostPet.name}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                <PiSyringe />
                                <span className='ml-2'>Kategorija</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>{lostPet.animalCategory}</span>
                            </div>
                        </div>


                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                <span className='ml-2'>Lokacija</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>{lostPet.location}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                {(lostPet.spol == "musko" ? <IoIosMale /> : <IoMaleFemale/>)}
                                <span className='ml-2'>Spol</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>{lostPet.spol}</span>
                            </div>
                        </div>
                </div>
                <p className='text-xl text-[#2F5382] pb-5 font-bold'>Detaljan opis:</p>
                <div className='w-full shadow-2xl min-h-[10vh]'>
                        <textarea value={lostPet.description} className='w-full p-3 rounded-2xl h-[40vh] text-lg bg-white resize-none text-gray-800 overflow-hidden' disabled />
                    </div>
                

            </div>

            <div className='xxs:w-full md:w-[30%] h-full rounded-2xl shadow-2xl'>
                 <div className='w-full h-full p-5 flex flex-col justify-between items-start text-black'>
                    <p className='py-2 text-[#2F5382]'>Ime korisnika: <span className='text-black'>{usernameLenght(lostPet.username)}</span></p>
                    <p className='pb-2 text-[#2F5382]'>Broj telefona: <span className='text-black'>{lostPet.phoneNumber}</span></p>
                    <p className='pb-5 text-[#2F5382]'>Kreirano: <span className='text-black'>{lostPet.createdAt.toLocaleDateString('bs-BA',{
                                            year:'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</span></p>

                        <div className={ (user?.id == lostPet.post_id) ? 'w-full flex flex-col justify-between gap-5 pt-5' : "hidden"}>
                            <button className="btn bg-[#2F5382] text-lg text-white rounded-full w-full mt-5
                                        hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">Uredi oglas</button>
                            <DeleteButton id={lostPet.id} />
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
