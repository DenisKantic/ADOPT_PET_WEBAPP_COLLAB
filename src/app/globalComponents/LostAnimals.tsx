import Image from 'next/image';
import Link from 'next/link';
import {db} from "@public/lib/db"
import { notFound } from 'next/navigation';
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";


export default async function CardItem() {
    
    const animals = await db.lostPetPost.findMany({
        take:4
    })
    
    if(!animals) notFound();

  return (
        <>
        {animals.map(item=>(
        <div className="h-auto rounded-xl my-5 w-full pb-2 shadow-2xl" key={item.id}>
            <Image
            src={item.imageUrls[0]}
            alt={item.name}
            height={50}
            width={50}
            unoptimized
            className="object-cover rounded-t-2xl xxs:h-[30vh] shadow-lg w-full"
            />
            <div className="w-full px-5">
                <ul className="text-black mt-2 flex flex-col">
                    <li className="flex items-center">
                        {item.animalCategory == "pas" ? <PiDogBold  className='text-[#2F5382] text-lg' /> 
                        :
                        item.animalCategory == "macka" ? <FaCat className='text-[#2F5382] text-lg'/>
                        :
                        <SiAnimalplanet className='text-[#2F5382] text-xl'/>
                    }
                        <span className="pl-3">{item.name.substring(0,20)}{item.name.length > 10 ? "..." : ""}</span></li>
                    {/* <li className="flex items-center">{item.spol == "musko" ? <IoIosMale className='text-[#2F5382] text-lg' /> : <IoMaleFemale className='text-red-600 text-xl'/>}<span className="pl-3">{item.spol}</span></li> */}
                    <li className="flex items-center"><IoLocationOutline className='text-[#2F5382] text-lg'/><span className="pl-3">{item.location}</span></li>
                </ul>
                <Link 
                href={`/lostPet/${item.id}`}
                className="btn bg-white text-lg text-[#2F5382] border-[#2F5382] rounded-full w-full mt-5
                            hover:bg-[#2F5382] hover:text-white">Pogledaj detalje</Link>
                            <p className='text-sm text-center py-2 text-gray-600'>Objavljeno: {item.createdAt.toLocaleDateString('bs-BA',{
                                year:'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</p>
            </div>
    </div>   
    ))}
    </>
  )
}

