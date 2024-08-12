"use client"
import React, { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { deleteLostPetPost } from '@public/actions/deletePost'

type Props = {
  id: string;
}

export default function DeleteButton({id}:Props) {

  const [isPending, startTransition] = useTransition(); // loading state


  const router = useRouter();

  const postId = id;


  const handleDelete = () =>{
      try {
        startTransition(async ()=>{
        const removePost = await deleteLostPetPost(postId)
        if(removePost.success){
          router.push('/dashboard')
          router.refresh();
        }})
      } catch (error) {
        console.log("cannot remove post in delete button", error);
      }
  }

  

  return (
    <> 
    <button onClick={handleDelete} disabled={isPending} className='btn btn-error w-full rounded-full text-xl text-white'>
    {isPending && <span className="loading loading-dots loading-lg bg-[#2F5382]"></span>}
    Obriši oglas
    </button>
    </>
  )
}
