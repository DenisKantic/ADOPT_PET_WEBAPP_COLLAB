"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  id: string;
}

export default function DeleteAnimal({id}: Props) {

  const router = useRouter();

  async function handleDelete(){
    try{
    const res = await fetch(`/api/post/${id}`, {
      method: "DELETE"
    });
    if(res.ok){
      router.push("/dashboard")
      router.refresh();
    }
  } catch(e){
    console.log("ERROR IN DELETE ANIMAL")
  }
    
  }

  return (
    <>  


    <button onClick={handleDelete} className='btn btn-error w-full rounded-full text-xl text-white'>Obriši oglas</button>
    </>
  )
}
