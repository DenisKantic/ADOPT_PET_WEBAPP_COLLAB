"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "./globalComponents/navbar/Navbar";
// import UserButton from "./UserButton";

export default function Home() {
  const session = useSession();
  const user = session.data?.user;

  return (
   <>
   <Navbar />
   </>
  );
}

function SignInButton() {
  return <button className="btn btn-primary" onClick={() => signIn()}>Sign in</button>;
}