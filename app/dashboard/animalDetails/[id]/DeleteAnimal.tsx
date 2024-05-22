"use client"
import React from 'react'
import {prisma} from "@/lib/prisma"
import { notFound } from 'next/navigation'


const deleteAnimalPost = (id: string)=>{
  const animal = prisma.adoptAnimal.delete({where: {id}})

  if(!animal) notFound();

  return animal;
}

export default function deleteAnimal({postId}) {
  return (
    <> 
    <button onClick={()=>deleteAnimalPost(postId.id)} className='btn btn-error w-full rounded-full text-xl text-white'>Obriši oglas</button>
    </>
  )
}
