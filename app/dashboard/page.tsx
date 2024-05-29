import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import {prisma} from "@/lib/prisma"
import Link from "next/link";
import AllAnimals from "./AllAnimals";
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";
import DonationPost from "./DonationPost";

export const metadata: Metadata = {
    title: "Dashboard",
  };

export default async function Dashboard() {

    const session = await getSession()
    const user = session?.user;
    const userId = session?.user?.id;


    if(!user){
        redirect("/")
    }

    const oglasi = await prisma.adoptAnimal.findMany({
      where:{
        post_id: userId
      }
    })

    let postCounter = oglasi.length;

  return (
    <div className='min-h-screen w-full bg-white px-14 py-20'>
      <div className="flex flex-col">
            <div className="bg-white rounded-xl h-full col-span-2 row-span-4">
                    <h1 className="text-xl text-black">Vaši oglasi <span className="text-md font-bold text-gray-700">{postCounter}</span></h1>
                    <div className="grid grid-cols-4 gap-10 shadow-2xl rounded-2xl p-5">
                      {oglasi.map(item=>(
                        <div className="h-auto rounded-xl my-5 w-full pb-2" key={item.id}>
                            <Image
                        src="/images/dog_photo.jpg"
                        alt={item.petName}
                        height={50}
                        width={50}
                        unoptimized
                        className="object-cover rounded-2xl h-[20vh] bg-purple-400 w-full"
                        />
                        <div className="w-full">
                            <ul className="text-black mt-2 flex flex-col">
                                <li className="flex items-center">
                                    {item.category == "pas" ? <PiDogBold  className='text-[#2F5382] text-lg' /> 
                                    :
                                    item.category == "macka" ? <FaCat className='text-[#2F5382] text-lg'/>
                                    :
                                    <SiAnimalplanet className='text-[#2F5382] text-xl'/>
                                }
                                    <span className="pl-3">{item.petName.substring(0,20)}{item.petName.length > 10 ? "..." : ""}</span></li>
                                <li className="flex items-center">{item.spol == "musko" ? <IoIosMale className='text-[#2F5382] text-lg' /> : <IoMaleFemale className='text-red-600 text-xl'/>}<span className="pl-3">{item.spol}</span></li>
                                <li className="flex items-center"><IoLocationOutline className='text-[#2F5382] text-lg'/><span className="pl-3">Lokacija</span></li>
                                <li className="flex items-center"><MdOutlinePets className='text-[#2F5382] text-lg'/><span className="pl-3">{item.starost}</span></li>
                            </ul>
                            <Link 
                            href={`/dashboard/animalDetails/${item.id}`}
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
            </div>
           </div>

           <div className="bg-white rounded-xl h-full col-span-2 row-span-4 p-5 shadow-xl mt-10">
                    <h1 className="text-xl text-black">Donacijski oglasi: <span className="text-md font-bold text-gray-700">{postCounter}</span></h1>
                    <div className="grid grid-cols-4 gap-10 shadow-2xl">
                    <Link 
                                href={`/dashboard/CreateDonationPost`}
                                className="btn bg-white text-lg text-blue-600 rounded-full mt-5">Kreiraj donaciju</Link>
                    </div>

                    <DonationPost />
              </div>

      <div className="mt-10 grid grid-cols-5 grid-rows-1 gap-10 w-full rounded-2xl shadow-xl text-black">
        
        <div className="col-span-3 row-span-2 p-5">
        <p>Najnoviji ljubimci</p>
        <div className="grid grid-cols-3 gap-20">
            <AllAnimals />
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
