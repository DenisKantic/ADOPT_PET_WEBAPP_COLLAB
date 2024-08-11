"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { deletePost } from '@public/actions/deletePost'
import { revalidatePath } from 'next/cache'


type Props = {
  id: string;
}

export default function DeleteButton({id}:Props) {

  const router = useRouter();

  const postId = id;


  const handleDelete = async () =>{
      try {
        const removePost = await deletePost(postId)
        if(removePost.success){
          router.push('/dashboard')
          router.refresh();
        }
      } catch (error) {
        console.log("cannot remove post in delete button", error);
      }
  }

  

  return (
    <> 
    <button onClick={handleDelete} className='btn btn-error w-full rounded-full text-xl text-white'>Obriši oglas</button>
    </>
  )
}
