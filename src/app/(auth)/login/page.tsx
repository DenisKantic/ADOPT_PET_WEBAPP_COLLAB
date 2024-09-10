'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { UseAuth } from '@/app/AuthContext'

export default function Register() {
  const [error, setError] = useState<boolean | undefined>(false)
  const [success, setSuccess] = useState<boolean | undefined>(false)
  const [isPending, startTransition] = useTransition()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { isAuthenticated, Login } = UseAuth()

  const checkUser = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
      router.refresh()
    }
  }

  useEffect(() => {
    checkUser()
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    const response = await Login(formData)
    if (response.success) {
      setSuccess(true)
      setError(false)
      router.push('/dashboard')
      router.refresh()
    } else {
      setError(true)
      setSuccess(false)
    }
  }

  return (
    <div className="h-[100svh]  w-full flex items-center justify-center bg-[#2f5382]">
      <div
        className="card bg-white rounded-xl p-5 text-black 
                        xxs:w-full xxs:h-screen xxs:overflow-y-scroll 
                        md:w-[500px] md:min-h-[50vh] md:h-auto md:overflow-hidden"
      >
        <Image
          src="/images/logo.png"
          alt="logo image"
          height={120}
          width={120}
          className="mx-auto"
        />
        <p className="text-2xl py-4 text-center font-bold text-[#2F5382]">
          Prijavi se
        </p>
        <div className="absolute">
          <Image
            src="/images/paw-2.png"
            alt="paw-2"
            height={50}
            width={50}
            className="relative top-3 -rotate-45"
          />
        </div>
        <br />

        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-[90%] mx-auto flex flex-col pt-10"
        >
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            // {...register('email')}
            type="email"
            className="outline-none p-4 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200"
          />
          {/* {errors.email && <span className='text-red-500'>{errors.email.message}</span>} */}

          <br />

          <label htmlFor="password">Šifra</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            // {...register('password')}
            type="password"
            className="outline-none p-4 mt-2 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200"
          />
          {/* {errors.password && <span className='text-red-500'>{errors.password.message}</span>} */}

          <br />

          <button
            disabled={isPending}
            type="submit"
            className="btn bg-[#2F5382] text-white text-lg rounded-full"
          >
            Prijavi se
          </button>

          {error && (
            <span className="text-white rounded-full py-3 mt-2 px-4 bg-red-400">
              Prijava nije uspješna
            </span>
          )}

          {success && (
            <span className="text-white rounded-full py-3 mt-2 px-4 bg-green-400">
              Prijava uspješna
            </span>
          )}
        </form>

        <div className="text-sm text-center text-neutral-500 mt-5">
          Nemaš kreiran nalog?{' '}
          <Link href={'/register'} className="font-bold text-neutral-900">
            Kreiraj ovdje!
          </Link>
        </div>
      </div>
    </div>
  )
}
