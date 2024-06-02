"use client"
import { useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { useFormik } from "formik";
import { schema } from "@/app/schemas/schema";
import FormSubmitButton from "../globalComponents/FormSubmitButton"
import SignInButton from "../register/SignInButton";


export default function Login() { 

  const [isLoading, setIsLoading] = useState(false);

   // use formik hook
   const formik = useFormik({
   initialValues: {
    email: "",
    password: ""
  },
  validationSchema: schema,
  onSubmit: async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      if (response.ok) {
        console.log("GREAT");
        window.location.href = "/dashboard";
      } else {
        console.error('Login failed!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  }
  })
    //   .then((callback) => {
    //     if (callback?.error) {
    //         console.error(callback.error)
    //     }

    //     if(callback?.ok && !callback?.error) {
    //         console.log('Logged in successfully!')
    //     }
    // } )

  //     if(signInData?.error) {
  //       console.log(signInData.error);
  //     } else {
  //       console.log("error")
  //     }
  //   }
  // })

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

        
        <div className="flex flex-col justify-center mt-2 mb-5">
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

        <SignInButton  />

        <button type="submit" className="btn bg-[#2F5382] text-lg text-white  border-[#2F5382] rounded-full w-full mt-5
             hover:bg-white hover:text-[#2F5382]">Prijavi se</button>


        <p className="text-md text-center mt-4">Imaš profil? 
        <Link className="underline hover:text-[#2f5382] ml-2" href="/login">
            Logiraj se ovdje
            </Link></p>
    </form>
</div>
</div>
  )
}
