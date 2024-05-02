import React from 'react'
import { User } from "next-auth";
import { signOut } from 'next-auth/react';



interface UserButtonProps {
    user: User;
  }

export default function UserButton({user}: UserButtonProps) {
  return (
    <div className='dropdown dropdown-content'>
      <ul>
        <button className='btn btn-primary' onClick={()=>signOut()}>Log out</button>
      </ul>
    </div>
  )
}
