"use client"
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { RegisterSchema } from "@public/schema";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useTransition } from "react";
import * as z from "zod";
import { registerZod } from "@public/actions/register";
import {useRouter} from "next/navigation";


export default function Register() {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  
  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues:{
        email: "",
        password: "",
        name: "",
      }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) =>{
    setError("")
    setSuccess("")

    startTransition(()=>{
      registerZod(values)
      .then((data)=>{
        router.push("/login");
        setError(data?.error)
        setSuccess(data?.sucess)
      })
    })
  }
  // const delay = (data: any) => {
  //   if (data?.success) {
  //     setTimeout(() => {
  //     }, 1000);
  //   }
  // }
  

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

        <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] mx-auto flex flex-col pt-10'>

              <label htmlFor="email">Email</label>
              <input 
              disabled={isPending} 
              {...register('email')} 
              type="email"
              className="outline-none p-4 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200" />
              {errors.email && <span className='text-red-500'>{errors.email.message}</span>}

              <br />

              <label htmlFor="name">Korisničko ime</label>
              <input 
              disabled={isPending} 
              {...register('name')} 
              type="text" 
              className="outline-none p-4 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200" />
              {errors.name && <span className='text-red-500'>{errors.name.message}</span>}

              <br />

              <label htmlFor='password'>Šifra</label>
              <input  
              disabled={isPending} 
              {...register('password')} 
              type="password" 
              className="outline-none p-4 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200" />
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}

              <br />

              {error && <span className='w-full py-4 px-4 rounded-xl font-bold tracking-wide text-white bg-red-500 mb-4'>{error}</span>}
              {success && <span className='w-full py-4 px-4 rounded-xl font-bold tracking-wide text-white bg-green-500 mb-4'>{success}</span>}

              <button disabled={isPending} type='submit' className='btn bg-[#2F5382] text-white rounded-full text-lg'>Registruj se</button>
        </form>

        
        <div className="text-sm text-center text-neutral-500 mt-5">
          Imaš kreiran nalog?{" "}
          <Link href={"/signin"} className="font-bold text-neutral-900">
            Logiraj se ovdje
          </Link>
        </div>
      </div>
    </div>
  );
}
