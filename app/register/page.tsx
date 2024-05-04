"use client"
import Link from "next/link"
import { useSession } from "next-auth/react"
import SignInButton from "../login/SignInButton"
import { redirect } from "next/navigation";

export default function Register() {

  const session = useSession();
  const user = session.data?.user;

  if(user){
    redirect('/')
  } 
  
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <form className="card w-[30%] min-h-[50vh] bg-base-300 rounded-xl p-5">
            <p className="text-2xl py-2 text-center font-bold">Kreiraj profil</p>

            
            <div className="flex flex-col justify-center mt-10">
            <label className="text-lg">
                Email
            </label>
            <input
            className="input mt-5 p-5 input-bordered text-lg"
            name="email"
            type="email"
            required
            placeholder="Upisite svoj mail"
            />
            <br />

            <label className="text-lg">
                Username {"(Korisnicko ime)"}
            </label>
            <input
            className="input mt-5 p-5 input-bordered text-lg"
            name="username"
            type="text"
            required
            placeholder="Upisite svoj username"
            />
            <br />

            <label className="text-lg">
                Password
            </label>
            <input
            className="input mt-5 p-5 input-bordered text-lg"
            type="password"
            name="password"
            required
            placeholder="Upisite svoju sifru"
            />
            </div>

            <button 
            className="btn btn-info my-5 text-xl hover:text-white"
            type="submit"
            >
              Prijavi se
            </button>

            <label className="text-white text-center text-lg">Ili jos bolje. Koristi svoj Google Account</label>
            <SignInButton />


            <p className="text-lg text-center">Imate vec kreiran profil? 
            <Link className="underline hover:text-white ml-2" href="/login">
                Prijavite se ovdje
                </Link></p>

        </form>
    </div>
  )
}
