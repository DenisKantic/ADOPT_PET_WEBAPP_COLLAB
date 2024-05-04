import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="navbar bg-[#F0F0F0] px-10 py-1">
  <div className="flex-1">
  <Image
            src="/images/logo.png"
            alt="logo"
            height={40}
            width={40} />
  </div>
  <div className="flex-none gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar flex flex-col">
        <div className="w-10 rounded-full">
                <Image
                src="/images/logo.png"
                alt="logo"
                height={50}
                width={50} 
                />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Moj profil
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Postavke</a></li>
        <li><a>Objavi oglas</a></li>
        <li><a>Odjavi se</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}
