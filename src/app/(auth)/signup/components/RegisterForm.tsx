"use client";

import Input from "../../../../../components/Input";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function RegisterForm() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const register = async () => {
    setLoading(true);
    try {
      await axios.post("/api/register", {
        email,
        username,
        password,
      });

      toast.success("Successfully registered");

      router.push("/signin");
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 flex flex-col items-center">
      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <div className="absolute right-1 top-20 ">
        <Image
          src="/images/paw-3.png"
          alt="paw3"
          height={50}
          width={50}
          className="p-2"
        />
      </div>
      <Input
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
        type="text"
      />
      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        type="password"
      />
      <Input
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        onClick={register}
        className="btn bg-[#2F5382] text-lg text-white  border-[#2F5382] rounded-full w-full mt-5
                 hover:bg-white hover:text-[#2F5382]"
      >
        Kreiraj Profil
      </div>
    </div>
  );
}
