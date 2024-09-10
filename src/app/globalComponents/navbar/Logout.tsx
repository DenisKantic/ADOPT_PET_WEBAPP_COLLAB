'use client'
import { UseAuth } from '@/app/AuthContext'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()
  const { Logout } = UseAuth()

  return (
    <>
      <li
        onClick={() => {
          Logout()
          router.push('/')
          router.refresh()
        }}
        className="btn bg-[#2f5382] rounded-full text-white flex items-center justify-center mt-5"
      >
        Odjavi se
      </li>
    </>
  )
}
