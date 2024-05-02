"use client"
import React from 'react'
import { signIn } from 'next-auth/react'

export default function SignInButton() {

  return (
    <>
       <button onClick={()=>signIn()} className="btn btn-secondary">Google Account</button>
    </>
  )
}
