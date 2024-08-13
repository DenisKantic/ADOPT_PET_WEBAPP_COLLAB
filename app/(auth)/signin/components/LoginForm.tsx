"use client";

import Input from "@/components/Input";
import { signIn, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginForm() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.ok) {
      toast.success("Correct login");
      window.location.assign("/");
    } else if (login?.error) {
      toast.error(login?.error);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-5 flex flex-col items-center">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <div className="absolute right-1 bottom-21">
        <Image
          src="/images/paw-3.png"
          alt="paw3"
          height={50}
          width={50}
          className="p-2"
        />
      </div>
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        type="password"
      />
      <div className="absolute left-3 bottom-1">
        <Image
          src="/images/paw.png"
          alt="paw-img"
          height={30}
          width={40}
          className="p-2"
        />
      </div>
      <div
        onClick={login}
        className="btn bg-[#2F5382] text-lg text-white  border-[#2F5382] rounded-full w-full mt-5
                 hover:bg-white hover:text-[#2F5382]"
      >
        Logiraj se
      </div>
    </div>
  );
}
