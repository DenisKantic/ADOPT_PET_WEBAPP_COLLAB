'use client'
import React from 'react'
import FilterMenu from './FilterMenu'
import CardItem from './CardItem'

export default function DonationPost() {
  return (
    <div className="min-h-screen pt-5 bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
      <div className="mt-2 grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 w-full h-full">
        <p>Donation Post</p>
        <CardItem />
      </div>
    </div>
  )
}
