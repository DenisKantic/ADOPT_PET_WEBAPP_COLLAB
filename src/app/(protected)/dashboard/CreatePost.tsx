import Link from 'next/link';
import React from 'react'
import { IoCreate } from "react-icons/io5";

type Props={
    post: string;
}


export default function CreatePost({post}:Props) {
  return (
    <div className='w-full mx-auto min-h-[15vh] mt-5 bg-[#2F5382] rounded-xl text-white flex flex-col justify-center items-center
                    hover:bg-[#4b87d4]'>
        <Link className='text-[3em] w-full flex items-center flex-col justify-center' href={`/dashboard/${post}`}>
            <p className='text-xl text-center'>Kreirajte objavu</p>
            <IoCreate />
        </Link>
      
    </div>
  )
}
