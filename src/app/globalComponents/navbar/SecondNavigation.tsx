import React from 'react'
import Link from 'next/link'

export default function SecondNavigation() {
  return (
    <div className="xxs:hidden md:flex justify-center gap-5 items-center w-full bg-gray-300 h-[10svh]">
      <div className="w-[50%] flex justify-between items-center text-xl">
        <Link href="/adoptPost">Udomi životinju</Link>
        <Link href="/adoptPost">Izgubljene životinje</Link>
        <Link href="/adoptPost">Donacijski oglasi</Link>
        <Link href="/adoptPost">Veterinarske stanice</Link>
      </div>
    </div>
  )
}
