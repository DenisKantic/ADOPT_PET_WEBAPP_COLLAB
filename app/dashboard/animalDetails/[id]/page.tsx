import React, { cache } from 'react'
import getSession from '@/lib/getSession'
import { notFound, redirect } from 'next/navigation'
import {prisma} from '@/lib/prisma'


type Props = {
    params:{
        id:string
    }
}


const getAnimal = cache(async (id: string)=>{
    const animal = await prisma.adoptAnimal.findUnique({where: {id}})

    console.log("EVO ID:", id)
    if(!animal) notFound();
    
    return animal;
})

export default async function AnimalDetails({params: {id}} : Props) {

    const session = await getSession()
    const user = session?.user;

    console.log("EVO ID:", id)

    if(!user){
        redirect("/")
    }

    const animal = await getAnimal(id)

  return (
    <div className='h-screen bg-white flex items-center justify-center font-bold text-black text-2xl'>

        <h1>Pet name: {animal.petName}</h1>
      
    </div>
  )
}
