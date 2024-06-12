"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
  return (
    <>
    <a className="my-2 text-red-800 font-bold rounded-xl text-start flex justify-start text-md w-full" 
    onClick={()=>signOut()}>Odjavi se</a>
    </>
  )
}
