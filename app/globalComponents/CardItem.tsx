import React, {cache} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {prisma} from "@/lib/prisma"
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";



async function getAnimals(){
    const animals = await prisma.adoptAnimal.findMany({
        orderBy: {id: "desc"}
    })
    
    if(!animals) notFound();
    
    return animals;
}




export default async function CardItem() {
    
    const animals = await getAnimals();

  return (
        <>
        {animals.map(item=>(
        <div className="h-auto rounded-xl my-5 w-full pb-2" key={item.id}>
            <Image
            src="/images/dog_photo.jpg"
            alt={item.petName}
            height={50}
            width={50}
            unoptimized
            className="object-cover rounded-2xl h-[15vh] bg-purple-400 w-full"
            />
            <div className="w-full">
                <ul className="text-black mt-2 flex flex-col">
                    <li className="flex ids-center">{item.spol == "musko" ? <IoIosMale /> : <IoMaleFemale />}<span className="pl-3">{item.spol}</span></li>
                    <li className="flex ids-center">{item.spol == "musko" ? <IoIosMale /> : <IoMaleFemale />}<span className="pl-3">Lokacija</span></li>
                    <li className="flex ids-center">{item.spol == "musko" ? <IoIosMale /> : <IoMaleFemale />}<span className="pl-3">{item.starost}</span></li>
                </ul>
                <Link 
                href={`/animalDetails/${item.id}`}
                className="btn bg-white text-lg text-blue-600 rounded-full w-full mt-5">Pogledaj detalje</Link>
            </div>
    </div>   
    ))}
    </>
  )
}

