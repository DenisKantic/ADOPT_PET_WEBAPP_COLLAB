'use client'
import { UseAuth } from '@/app/AuthContext'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()
  const { isAuthenticated, Logout } = UseAuth()

  return (
    <>
      <li
        onClick={() => {
          Logout()
          router.push('/')
        }}
        className={
          isAuthenticated
            ? 'btn btn-primary flex items-center justify-center mt-5'
            : 'hidden'
        }
      >
        SignOut
      </li>
    </>
  )
}
