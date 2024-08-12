import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";
import { getAdoptPost } from '@public/actions/getAllAdoptPost';

interface AdoptPost{
    id: number,
    image_paths: string,
    category: string,
    petname: string,
    phoneNumber: string,
    description: string,
    vakcinisan: boolean,
    cipovan: boolean,
    pasos: boolean,
    spol: string,
    starost: string,
    location: string,
    slug: string,
    created_at: Date;
}



export default async function CardItem() {
    
    const response = await getAdoptPost();

    const animals: AdoptPost[] = response?.data?.adopt_post || [];
    if(!animals.length) notFound();


  return (
        <>
        {animals.map((item)=>{

            const imagePaths = typeof item.image_paths === 'string'
            ? item.image_paths.replace(/[{}]/g, '').split(',')
            : []; // Fallback to empty array if image_paths is not a string
            imagePaths.map((path:string, index:number)=>(
                console.log(path, index)
            )) 

            const firstImagePath = imagePaths[0] || '';

            const pas = item.category;
            const macka = item.category;

            return (
        <div className="h-auto rounded-xl my-5 w-full pb-2 shadow-2xl" key={item.id}>
             {firstImagePath && (
                            <Image
                                src={`http://localhost:8080/${firstImagePath}`}
                                alt={item.petname}
                                height={50}
                                width={50}
                                unoptimized
                                className="object-cover rounded-t-2xl xxs:h-[30vh] shadow-lg w-full"
                            />
                        )}
            <div className="w-full px-5">
                <ul className="text-black mt-2 flex flex-col">
                    <li className="flex items-center">
                        {item.category == "pas" ? <PiDogBold  className='text-[#2F5382] text-lg' />
                        :
                        item.category == "macka" ? <FaCat className='text-[#2F5382] text-lg'/>
                        :
                        <SiAnimalplanet className='text-[#2F5382] text-xl'/>
                    }
                        <span className="pl-3">{item.petname.substring(0,20)}{item.petname.length > 10 ? "..." : ""}</span></li>
                    <li className="flex items-center">{item.spol == "musko" ? <IoIosMale className='text-[#2F5382] text-lg' /> : <IoMaleFemale className='text-red-600 text-xl'/>}<span className="pl-3">{item.spol}</span></li>
                    <li className="flex items-center"><IoLocationOutline className='text-[#2F5382] text-lg'/><span className="pl-3">{item.location}</span></li>
                    <li className="flex items-center"><MdOutlinePets className='text-[#2F5382] text-lg'/><span className="pl-3">{item.starost}</span></li>
                </ul>
                <Link 
                href={`/adoptPet/${item.id}`}
                className="btn bg-white text-lg text-[#2F5382] border-[#2F5382] rounded-full w-full mt-5
                            hover:bg-[#2F5382] hover:text-white">Pogledaj detalje</Link>
                            {/* <p className='text-sm text-center py-2 text-gray-600'>Objavljeno: {item.created_at.toLocaleDateString('bs-BA',{
                                year:'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}</p> */}
            </div>
    </div>   
    )})}
    </>
)
}

