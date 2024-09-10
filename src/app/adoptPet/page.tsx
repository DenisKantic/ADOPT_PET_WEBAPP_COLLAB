'use client'
import React from 'react'
import CardItem from './CardItem'

export default function AdoptPet() {
  return (
    <div className="min-h-[100svh] pt-5 bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
      <div className="mt-2 grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 w-full h-full pb-20">
        <CardItem />
      </div>
    </div>
  )
}
