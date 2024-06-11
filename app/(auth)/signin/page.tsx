import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import Image from "next/image";
import SignInButton from "./components/SignInButton";

export default function LoginPage() {
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
        <p className="text-2xl py-2 text-center font-bold">Prijavi se</p>
        <div className="absolute">
          <Image
            src="/images/paw-2.png"
            alt="paw-2"
            height={50}
            width={50}
            className="relative -right-2"
          />
        </div>
        <br />
        <LoginForm />
        <br />
        <SignInButton />
        <div className="text-sm text-center text-neutral-500 mt-5">
          Nemaš kreiran nalog?{" "}
          <Link href={"/signup"} className="font-bold text-neutral-900">
            Registruj se
          </Link>
        </div>
      </div>
    </div>
  );
}
