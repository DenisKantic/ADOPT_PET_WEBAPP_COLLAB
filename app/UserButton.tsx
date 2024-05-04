import React from 'react'
import { signOut } from 'next-auth/react';

export default function UserButton() {
  return (
    <div className='dropdown dropdown-content'>
      <ul>
        <button className='btn btn-primary' onClick={()=>signOut()}>Log out</button>
      </ul>
    </div>
  )
}
