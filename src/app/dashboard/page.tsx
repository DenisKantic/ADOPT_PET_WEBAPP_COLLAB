'use server'
import React from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'
import AllAnimals from './AllAnimals'
import CardItem from '../globalComponents/CardItem'
import CreatePost from './CreatePost'
import LostPetPost from './LostPetPost'

export default async function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-white xxs:px-4 md:px-14 pt-5">
      <div className="flex flex-col">
        <div className="rounded-xl h-full col-span-4 row-span-1">
          <h1 className="text-xl text-black">Vaši oglasi: </h1>
          <span className="text-md font-bold text-gray-700">3</span> <br />
          <span className="text-sm text-gray-600">
            {'*Maksimalno tri oglasa'}
          </span>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-1 items-center shadow-2xl rounded-2xl p-5 min-h-[40vh] bg-gray-100">
            <AllAnimals />
          </div>
        </div>

        <div className="rounded-xl h-full col-span-4 row-span-1">
          <h1 className="text-xl text-black">Donacijski oglasi: </h1>
          <span className="text-md font-bold text-gray-700">3</span> <br />
          <span className="text-sm text-gray-600">
            {'*Maksimalno tri oglasa'}
          </span>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-1 items-center shadow-2xl rounded-2xl p-5 min-h-[40vh] bg-gray-100">
            <AllAnimals />
          </div>
        </div>

        <div className="rounded-xl h-full col-span-4 row-span-1">
          <h1 className="text-xl text-black">Izgubljeni ljubimci: </h1>
          <span className="text-md font-bold text-gray-700">3</span> <br />
          <span className="text-sm text-gray-600">
            {'*Maksimalno tri oglasa'}
          </span>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 grid-rows-1 items-center shadow-2xl rounded-2xl p-5 min-h-[40vh] bg-gray-100">
            <LostPetPost />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-5 grid-rows-1 gap-10 w-full rounded-2xl shadow-xl text-black">
          <div className="col-span-3 row-span-2 p-5">
            <p>Najnoviji ljubimci</p>
            <div className="grid grid-cols-3 gap-20">
              <CardItem />
            </div>
          </div>

          <div className="col-span-2 bg-red-200 p-5">
            <h1>Vet stanice</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
