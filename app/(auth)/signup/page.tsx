import React from "react";
import RegisterForm from "./components/RegisterForm";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#2f5382] ">
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
            height={40}
            width={50}
            className="relative top-3"
          />
        </div>
        <br />

        <RegisterForm />
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
