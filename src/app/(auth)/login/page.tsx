"use client"
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { LoginSchema } from "@public/schema";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import { useTransition } from "react";
import * as z from "zod";
import { loginZod } from "@public/actions/login";


export default function Register() {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  
  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues:{
        email: "",
        password: "",
      }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
    setError("")
    setSuccess("")

    startTransition(()=>{
      loginZod(values)
      .then((data)=>{
        setError(data?.error)
      })
    })
  
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

        <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] mx-auto flex flex-col pt-10'>

              <label htmlFor="email">Email</label>
              <input 
              disabled={isPending} 
              {...register('email')} 
              type="email"
              className="outline-none p-2 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200" />
              {errors.email && <span className='text-red-500'>{errors.email.message}</span>}

              <br />

              <label htmlFor='password'>Password</label>
              <input  
              disabled={isPending} 
              {...register('password')} 
              type="password" 
              className="outline-none p-2 mt-2 mb-3 input input-bordered input-primary w-full rounded-full 
              peer focus:border-neutral-200 disabled:bg-neutral-200 focus:bg-white bg-slate-200" />
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}

              <br />

              {error && <span className='text-red-500'>{error}</span>}
              {success && <span className='text-green-500'>{success}</span>}

              <button disabled={isPending} type='submit' className='btn btn-primary'>Register</button>
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
