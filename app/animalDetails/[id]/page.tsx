import React, { cache } from 'react'
import getSession from '@/lib/getSession'
import { notFound, redirect } from 'next/navigation'
import {prisma} from '@/lib/prisma'
import Image from 'next/image'
import DeleteAnimal from '@/app/dashboard/animalDetails/[id]/DeleteAnimal'
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiSyringe } from "react-icons/pi";
import { GrCircleInformation } from "react-icons/gr";
import { TbEPassport } from "react-icons/tb";


type Props = {
    params:{
        id:string
    }
}


const getAnimal = cache(async (id: string)=>{
    const animal = await prisma.adoptAnimal.findUnique({where: {id}})
    
    if(!animal) notFound();
    
    return animal;
})

export default async function AnimalDetails({params: {id}} : Props) {

    const session = await getSession()
    const user = session?.user;

    const animal = await getAnimal(id)

  return (
    <div className='min-h-screen px-14 bg-white'>

            <p className='pt-20 text-black'>{animal.petName}</p>
        <div className='h-full w-full mx-auto bg-white pt-5 flex flex-row gap-10 justify-between'>
            <div className='w-[70%]'>
                <Image
                src="/images/dog_photo.jpg"
                alt={animal.petName}
                height={50}
                width={50}
                unoptimized
                className="object-cover rounded-2xl h-[60vh] w-full"
                />
                
                    <div className='grid grid-rows-2 grid-cols-3 gap-10 w-full py-5'>
                       
                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                 <MdOutlinePets/>
                                <span className='ml-2'>Ime</span>
                            </div>
                            <div>
                                <span className='font-bold text-[#2F5382]'>{animal.petName}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                <PiSyringe />
                                <span className='ml-2'>Vakcinisan</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>{animal.vakcina}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                            <GrCircleInformation />
                                <span className='ml-2'>Starost</span>
                            </div>
                            <div>
                                <span className='font-bold text-[#2F5382]'>{animal.starost}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                 <TbEPassport />
                                <span className='ml-2'>Pasoš</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>{animal.pasos}</span>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                            <div className='flex items-center'>
                                {(animal.spol == "musko" ? <IoIosMale /> : <IoMaleFemale/>)}
                                <span className='ml-2'>Spol</span>
                            </div>
                            <div>
                                <span  className='font-bold text-[#2F5382]'>{animal.spol}</span>
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
                <div className='w-full shadow-2xl min-h-[10vh]'>
                        <p className='text-xl text-black border-b-[1px] border-black'>Detaljan opis:</p>
                        <textarea value={animal.description} className='w-full h-[40vh] text-lg bg-white resize-none text-black overflow-hidden' disabled />
                    </div>
                

            </div>

            <div className='w-[30%] h-full rounded-2xl shadow-2xl'>
                 <div className='w-full h-full p-5 flex flex-col justify-between items-start text-black'>
                    <p>Ime korisnika: {}</p>
                    <p>Broj telefona: {animal.phoneNumber}</p>
                    <p className='pb-5'>Kreirano: {animal.createdAt.toLocaleDateString('bs-BA',{
                                            year:'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}</p>

                        <div className={ (user?.id == animal.post_id) ? 'w-full flex flex-col justify-between gap-5 pt-5' : "hidden"}>
                            <button className="btn bg-[#2F5382] text-lg text-white rounded-full w-full mt-5
                                        hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">Uredi oglas</button>
                            <DeleteAnimal id={animal.id} />
                        </div>
                 </div>
            </div>

        </div>
      
    </div>
  )
}
