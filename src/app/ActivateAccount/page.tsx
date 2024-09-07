'use client'
import React, { useEffect, useState } from 'react'
import { ActivateAccount } from '@public/actions/activateAccount'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LoadingSpinner from './Spinner'

export default function ActivateAcc() {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true) // Start loading
  const [error, setError] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [activated, setActivated] = useState<boolean>(false) // Track activation status
  const router = useRouter()

  const activateAcc = async (token: string) => {
    const response = await ActivateAccount(token)
    if (response?.success) {
      setMessage('Vaš korisnički nalog je aktiviran')
      setActivated(true) // Mark as activated
      setLoading(false)

      // Delay after account activation
      setTimeout(() => {
        router.push('/login') // Redirect after 2 seconds
      }, 2000)
    } else {
      setError(true)
      setLoading(false)
      router.push('/')
    }
  }

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get('token')

    if (!activated && queryToken) {
      setToken(queryToken)

      setTimeout(() => {
        activateAcc(queryToken)
      }, 2000) // Delay activation by 2 seconds
    } else if (!queryToken) {
      router.push('/') // Redirect if token is missing
    }
  }, [activated, router]) // Depend on `activated` to prevent re-run

  return (
    <div className="h-[93svh] w-full flex items-center justify-center bg-[#2f5382]">
      <div
        className="card bg-white rounded-xl p-5 text-black flex items-center
                      xxs:w-full xxs:h-screen xxs:overflow-y-scroll 
                      md:w-[500px] md:min-h-[20vh] md:h-auto md:overflow-hidden"
      >
        <Image
          src="/images/logo.png"
          alt="logo image"
          height={120}
          width={120}
          className="mx-auto"
        />

        <br />
        {loading ? <LoadingSpinner /> : null}

        <p>{message}</p>
        {error && (
          <p className="text-2xl py-4 text-center font-bold text-[#2F5382]">
            Desila se greška.
          </p>
        )}
      </div>
    </div>
  )
}
