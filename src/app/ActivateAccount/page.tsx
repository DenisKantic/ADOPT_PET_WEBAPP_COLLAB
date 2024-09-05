'use client'
import React, { useEffect, useState } from 'react'
import { ActivateAccount } from '@public/actions/activateAccount'

export default function ActivateAcc() {
  const [token, setToken] = useState<string | null>('')

  const activateAcc = async (token: any) => {
    const response = await ActivateAccount(token)
    if (response?.success) {
      console.log('PROFILE ACTIVATED')
    } else {
      console.log('PROBLEM WITH ACTIVATING ACCOUNT')
    }
  }

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token')
    setToken(token)
    if (token?.length === 0) {
      console.log('token is empty')
      return
    }

    activateAcc(token)
  }, [token])
  // Get token from query parameters

  console.log('your token is', token)
  return (
    <div>
      <div className="min-h-screen overflow-hidden bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
        <h1>Aktivirajte svoj korisnicki nalog!</h1>
      </div>
    </div>
  )
}
