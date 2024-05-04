"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import UserButton from "./UserButton";
// import UserButton from "./UserButton";

export default function Home() {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="sticky top-0 bg-background px-3 shadow-sm">
      <nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="font-bold">
          Home Page
        </Link>
        {user && <UserButton user={user}/>}
        {!user && session.status !== "loading" && <SignInButton />}
      </nav>
    </header>
  );
}

function SignInButton() {
  return <button className="btn btn-primary" onClick={() => signIn()}>Sign in</button>;
}