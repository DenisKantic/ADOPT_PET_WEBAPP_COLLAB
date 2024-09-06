'use client'
import React, { useEffect, useState } from 'react'
import { ActivateAccount } from '@public/actions/activateAccount'
import { useRouter } from 'next/navigation'

export default function ActivateAcc() {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  const activateAcc = async (token: any) => {
    const response = await ActivateAccount(token)
    if (response?.success) {
      console.log('PROFILE ACTIVATED')
      router.push('/login')
    } else {
      console.log('PROBLEM WITH ACTIVATING ACCOUNT')
    }
  }

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get('token')
    if (queryToken) {
      setToken(queryToken)
      activateAcc(queryToken) // Call activation after setting token
    } else {
      router.push('/') // Redirect if token is missing
    }
  }, []) //

  console.log('your token is', token)
  if (token?.length === 0) {
    router.push('/')
    console.log('token is empty')
    return
  }
  return (
    <div>
      <div className="min-h-screen overflow-hidden bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
        <h1>Aktivirajte svoj korisnicki nalog!</h1>
      </div>
    </div>
  )
}
