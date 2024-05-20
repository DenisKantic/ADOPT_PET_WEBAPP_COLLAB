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
      <div className="grid grid-cols-5 gap-14 grid-rows-4">
            <div className="bg-white rounded-xl h-full col-span-2 row-span-4 p-5 shadow-xl">
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
            <div className="col-span-3 row-span-2 p-5 rounded-2xl shadow-2xl text-black">
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-2xl row-span-1">Kako udomiti?</p>

                    <p className="py-5 text-md  h-auto">Proces udomljena ljubimca je jednostavan - pregledajte profile ljubimaca, pronađite svog idealnog saputnika i kontaktirajte
                      vlasnika za više informacija
                    </p>
                      <Link 
                          href="/"
                          className="btn text-lg bg-blue-600 w-[12em] text-white rounded-full mt-5">
                            Pogledaj vodič
                            </Link>

                            </div>

            </div>


            <div className="col-span-3 row-span-2 p-5 rounded-2xl shadow-xl text-black w-full">
              <p className="text-start text-2xl pb-4">Pronađi svog ljubimca</p>
                <div className="w-full grid grid-cols-3">
                      <Link href="/" className="h-[5vh] w-[10em] flex flex-col">
                      <Image
                              src="/images/dog_photo.jpg"
                              alt="dog_logo"
                              height={50}
                              width={50}
                              unoptimized
                              className="object-cover rounded-2xl w-[10em]"
                              />
                              <p className="py-2 text-center">PSI</p>
                      </Link>

                      <Link href="/" className="h-[5vh] w-[10em] flex flex-col">
                      <Image
                              src="/images/cat.jpg"
                              alt="dog_logo"
                              height={50}
                              width={50}
                              unoptimized
                              className="object-cover rounded-2xl w-[10em]"
                              />
                              <p className="py-2 text-center">MAČKE</p>
                      </Link>

                      <Link href="/" className="h-[5vh] w-[10em] flex flex-col">
                      <Image
                              src="/images/dog_photo.jpg"
                              alt="dog_logo"
                              height={50}
                              width={50}
                              unoptimized
                              className="object-cover rounded-2xl w-[10em]"
                              />
                              <p className="py-2 text-center">OSTALI LJUBIMCI</p>
                      </Link>
                </div>
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
