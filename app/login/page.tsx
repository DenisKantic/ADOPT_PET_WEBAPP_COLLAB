import Link from "next/link"
import Image from "next/image"
import SignInButton from "./SignInButton"
import { Metadata } from "next";
import {auth} from '@/auth'
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login"
};

export default async function Login() {

  const session = await auth();
  const user = session?.user;

  if(user){
    redirect("/")
  } 

  return (
        <div className="w-full h-screen flex justify-center items-center bg-[#2f5382]">
        <form className="card bg-white rounded-xl p-5 text-black 
                        xxs:w-full xxs:h-screen xxs:overflow-y-scroll 
                        md:w-[500px] md:min-h-[50vh] md:h-auto md:overflow-hidden">
          <Image
          src="/images/logo.png"
          alt="logo image"
          height={120}
          width={120}
          className="mx-auto" />
            <p className="text-2xl py-2 text-center font-bold">Prijavi se</p>

            
            <div className="flex flex-col justify-center mt-2">
            <label className="text-lg">
                Email
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
            name="email"
            type="email"
            placeholder="Upišite svoj mail"
            required
            />
            <br />

            <label className="text-lg">
                Password
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
            type="password"
            name="password"
            placeholder="Upišite svoju šifru"
            required
            />
            </div>

            <button 
            className="btn bg-[#2f5382] rounded-full mt-8 mb-5 text-xl text-white"
            type="submit"
            >
            Prijavi se
            </button>

            <p className="w-full text-center pb-5">ili nastavi sa Google Account</p>
            <SignInButton />

            <p className="text-md text-center mt-4">Nemaš profil? 
            <Link className="underline hover:text-[#2f5382] ml-2" href="/register">
                Klikni ovdje da kreiraš
                </Link></p>
        </form>
    </div>
  )
}
