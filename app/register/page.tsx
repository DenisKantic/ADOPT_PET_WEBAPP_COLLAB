"use client"
import Link from "next/link"
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { auth } from "@/auth";
import SignInButton from "./SignInButton";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useFormik } from "formik";
import { schema } from "@/app/schemas/schema";
import { useRouter } from "next/navigation";


export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const { pending } = useFormStatus();
  const router = useRouter(); 
  // const session = await auth();
  // const user = session?.user;

  // if(user){
  //   redirect('/')
  // }
  
  // use formik hook
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);

      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          name: values.name,
          password: values.password
        })
      })

      if(response.ok) {
        router.push('/login');
      } else {
        console.error('Registration failed!');
      }

    }
  })

  // deconstruct Formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <div className="w-full h-screen flex justify-center items-center bg-[#2f5382]">
        <form onSubmit={handleSubmit}
        className="card bg-white rounded-xl p-5 text-black 
                        xxs:w-full xxs:h-screen xxs:overflow-y-scroll 
                        md:w-[500px] md:min-h-[50vh] md:h-auto md:overflow-hidden">
          <Image
          src="/images/logo.png"
          alt="logo image"
          height={120}
          width={120}
          className="mx-auto" />
            <p className="text-2xl py-2 text-center font-bold">Kreiraj profil</p>

            
            <div className="flex flex-col justify-center mt-2">
            <label className="text-lg">
                Email
            </label>
            <input
            disabled={isLoading}
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Upišite svoj mail"
            />
            {touched.email && errors.email && 
            <div className="text-red-500 text-[14px] p-1">
              {errors.email}
            </div>
            }
            <br />

            <label className="text-lg">
                Username {"(Korisničko ime)"}
            </label>
            <input
            disabled={isLoading}
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            placeholder="Upišite svoj username"
            />
            {touched.name && errors.name && 
              <div className="text-red-500 text-[14px] p-1">
                {errors.name}
              </div>
            }
            <br />

            <label className="text-lg">
                Password
            </label>
            <input
            disabled={isLoading}
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Upišite svoju sifru"
            />
            {touched.password && errors.password &&
              <div className="text-red-500 text-[14px] p-1">
                {errors.password}
              </div>
            }
            </div>

            <button 
            className="btn bg-[#2f5382] rounded-full mt-8 mb-5 text-xl text-white"
            type="submit"
            aria-disabled={pending}
            >
            Kreiraj profil
            </button>

            <p className="w-full text-center pb-5">ili nastavi sa Google Account</p>
            <SignInButton />

            <p className="text-md text-center mt-4">Imaš profil? 
            <Link className="underline hover:text-[#2f5382] ml-2" href="/login">
                Logiraj se ovdje
                </Link></p>
        </form>
    </div>
    </div>
  )
}
