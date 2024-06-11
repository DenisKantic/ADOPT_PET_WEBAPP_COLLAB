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
    const res = await fetch(`/api/delete-post/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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
