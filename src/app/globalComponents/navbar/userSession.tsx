import React from 'react'
import { auth } from '@public/auth'
import Navbar from './Navbar';

export default async function userSession() {

    const session = await auth();
    const user = session?.user;
  return (
    <>
    <Navbar userData={user}/>
    </>
  )
}
