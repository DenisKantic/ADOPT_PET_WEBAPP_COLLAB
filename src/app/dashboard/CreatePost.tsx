'use client'
import Link from 'next/link'
import React from 'react'
import { IoCreate } from 'react-icons/io5'
import LoadingSpinner from '../globalComponents/Spinner'
import { useRouter } from 'next/navigation'

type Props = {
  postCounter: number
}

export default function CreatePost({ postCounter }: Props) {
  let isPostTrue = false

  const router = useRouter()

  if (postCounter >= 3) {
    isPostTrue = true
  }

  return (
    <div
      className={
        isPostTrue
          ? 'hidden'
          : 'w-full mx-auto min-h-[20vh] mt-5 bg-[#2F5382] rounded-xl text-white flex flex-col justify-center items-center hover:bg-[#4b87d4]'
      }
    >
      <button
        onClick={() => router.push('/dashboard/createAdoptPost')}
        className="text-[3em] w-full flex items-center flex-col justify-center"
      >
        <p className="text-xl text-center">Kreirajte objavu</p>
        <IoCreate />
      </button>
    </div>
  )
}
