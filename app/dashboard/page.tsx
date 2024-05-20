import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import {prisma} from "@/lib/prisma"
import Link from "next/link";
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";

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
    <div className='h-screen w-full bg-white px-14 py-20'>
      <div className="grid grid-cols-5 gap-14 grid-rows-3">
            <div className="bg-white rounded-xl h-[50vh] col-span-2 row-span-4 p-5 shadow-xl">
                    <h1 className="text-xl text-black">Vaši oglasi <span className="text-md font-bold text-gray-700">{postCounter}</span></h1>
                    <div className="grid grid-cols-2 gap-10">
                      {oglasi.map(item=>(
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
                                    <li className="flex items-center">{item.spol == "musko" ? <IoIosMale /> : <IoMaleFemale />}<span className="pl-3">{item.spol}</span></li>
                                    <li className="flex items-center">{item.spol == "musko" ? <IoIosMale /> : <IoMaleFemale />}<span className="pl-3">Lokacija</span></li>
                                    <li className="flex items-center">{item.spol == "musko" ? <IoIosMale /> : <IoMaleFemale />}<span className="pl-3">{item.starost}</span></li>
                                </ul>
                                <Link 
                                href={`/dashboard/animalDetails/${item.id}`}
                                className="btn bg-white text-lg text-blue-600 rounded-full w-full mt-5">Pogledaj detalje</Link>

                                <p className="mt-4 text-sm text-black flex justify-between">Datum objave oglasa: <span className="font-bold">{item.createdAt.toDateString()}</span></p>
                            </div>
                        </div>
                          ))}
                    </div>
            </div>
            <div className="bg-gray-300 col-span-3 row-span-2">
                    <h1>Test</h1>
            </div>

            <div className="bg-gray-300 col-span-3 row-span-2">
                    <h1>Test</h1>
            </div>
      </div>

      <div className="mt-10 grid grid-cols-5 grid-rows-1 gap-10 w-full">
        
        <div className="col-span-3 bg-red-400">
        <h1>Najnoviji ljubimci</h1>
                <h1>ostale zivotinje</h1>
        </div>

        <div className="col-span-2 bg-red-200">
            <h1>Vet stanice</h1>
        </div>
      </div>   

      <div className="h-[30vh] w-full bg-gray-500 text-white">
        <h1>ADOPT PET OGLAS</h1>

        {oglasi.map(item=>(
          <div key={item.id}>
            <span>Vakcinisan: {item.vakcina}</span> <br />
            <textarea className="textarea disabled bg-white text-black h-[20vh] w-full">{item.description}</textarea>
          </div>
        ))}

      </div>
    </div>
  )
}
