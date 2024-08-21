'use server'
import React from 'react'
import Image from "next/image";
import type { Metadata } from "next";
import AllAnimals from "./AllAnimals";
import CardItem from '../globalComponents/CardItem';


export default async function Dashboard() {

  const adoptPostCounter = 3

  return (
    <div className='min-h-screen w-full bg-white xxs:px-4 md:px-14 py-20'>
      <div className="flex flex-col">
            <div className="bg-white rounded-xl h-full col-span-2 row-span-4 xxs:col-span-4">
                    <h1 className="text-xl text-black">Vaši oglasi: </h1>
                       <span className="text-md font-bold text-gray-700">{adoptPostCounter}</span> <br />
                      <span className='text-sm text-gray-600'>{"*Maksimalno tri oglasa"}</span>
                     <div className="grid gap-10 shadow-2xl rounded-2xl p-5 xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 bg-green-400">
                    
                <AllAnimals/>
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
