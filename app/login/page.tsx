"use client"
import Link from "next/link"
import Image from "next/image"
import { useFormik } from "formik";
import { schema } from "@/app/schemas/schema";
import FormSubmitButton from "../globalComponents/FormSubmitButton"
import SignInButton from "../register/SignInButton";


export default function Login() { 

   // use formik hook
   const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      })

      if(response.ok) {
        console.log("GREAT")
      } else {
        console.error('Registration failed!');
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
        <div className="w-full h-screen flex flex-col justify-center items-center bg-[#2f5382]">
          <Image
          src="/images/logo.png"
          alt="logo image"
          height={120}
          width={120}
          className="mx-auto" />
            <p className="text-2xl py-2 text-center font-bold">Prijavi se</p>

            <form className="card bg-white rounded-xl p-5 text-black 
                        xxs:w-full xxs:h-screen xxs:overflow-y-scroll 
                        md:w-[500px] md:min-h-[50vh] md:h-auto md:overflow-hidden"
              onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center mt-2">
            <label className="text-lg">
                Email
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
            name="email"
            type="email"
            placeholder="Upišite svoj mail"
            value={values.email}
            onChange={handleChange}
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
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5  text-lg"
            type="password"
            name="password"
            placeholder="Upišite svoju šifru"
            value={values.password}
            onChange={handleChange}
            />
            {touched.password && errors.password && 
            <div className="text-red-500 text-[14px] p-1">
              {errors.password}
            </div>
            }
            </div>

            {/* <FormSubmitButton className="btn bg-[#2F5382] text-lg text-white  border-[#2F5382] rounded-full w-full mt-5
                 hover:bg-white hover:text-[#2F5382]">Prijavi se</FormSubmitButton> */}
            
            <SignInButton />


            <p className="text-md text-center mt-4">Nemaš profil? 
            <Link className="underline hover:text-[#2f5382] ml-2" href="/register">
                Klikni ovdje da kreiraš
                </Link></p>
        </form>
    </div>
  )
}
