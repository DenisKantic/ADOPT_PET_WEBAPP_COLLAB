"use client"
import React from 'react'
import { signIn } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {

  return (
    <>
       <a onClick={()=>signIn()} className="btn btn-outline rounded-full text-lg text-black"><FcGoogle className='text-3xl'/>Google Account</a>
    </>
  )
}
