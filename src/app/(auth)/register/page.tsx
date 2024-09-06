'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterProfile } from '@public/actions/register'

export default function Register() {
  const [error, setError] = useState<boolean | undefined>(false)
  const [success, setSuccess] = useState<boolean | undefined>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('username', username)

    try {
      const response = await RegisterProfile(formData)
      if (response?.success) {
        setSuccess(true)
        setError(false)
      }
    } catch (error) {
      setError(true)
      setSuccess(false)
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#2f5382]">
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
        <p className="text-2xl py-4 text-center font-bold">Kreiraj profil</p>
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
            type="email"
            className="outline-none p-4 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200"
          />

          <br />

          <label htmlFor="name">Korisničko ime</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="outline-none p-4 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200"
          />

          <br />

          <label htmlFor="password">Šifra</label>
          <input
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="outline-none p-4 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200"
          />
          {/* {errors.password && <span className='text-red-500'>{errors.password.message}</span>} */}

          <br />

          <button
            disabled={isPending}
            type="submit"
            className="btn bg-[#2F5382] text-white rounded-full text-lg"
          >
            Registruj se
          </button>

          {error && (
            <span className="text-white rounded-full py-3 mt-2 px-4 bg-red-400">
              Registracija nije uspješna
            </span>
          )}

          {success && (
            <span className="text-green-400 text-left py-3 mt-2 px-4">
              Registracija je uspješna. <br />
              Molimo Vas da provjerite Vaš email i aktivirate svoj profil.
            </span>
          )}
        </form>

        <div className="text-sm text-center text-neutral-500 mt-5">
          Imaš kreiran nalog?{' '}
          <Link href={'/signin'} className="font-bold text-neutral-900">
            Logiraj se ovdje
          </Link>
        </div>
      </div>
    </div>
  )
}
