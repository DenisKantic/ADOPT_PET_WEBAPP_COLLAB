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
import { getHomeAdoptPost } from '@public/actions/getHomePageAdoptPost';


interface AdoptPost{
    id: number,
    image_paths: string[],
    category: string,
    petname: string,
    spol: string,
    starost: string,
    location: string,
    slug: string,
    created_at: string;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Format to dd/mm/yy
    return date.toLocaleDateString('bs-BA', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};


export default async function CardItem() {
    
    const response = await getHomeAdoptPost();

    const animals: AdoptPost[] = response.adopt_post || [];
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

            return (
        <div className="relative rounded-xl my-5 w-full pb-2 shadow-2xl overflow-hidden group" key={item.id}>
             <Link 
                href={`/adoptPet/${item.slug}`} className=''>
             {firstImagePath && (
                            <Image
                                src={`http://localhost:8080/${firstImagePath}`}
                                alt={item.petname}
                                height={50}
                                width={50}
                                unoptimized
                                className="object-cover rounded-t-2xl xxs:h-[20vh] shadow-lg w-full"
                            />
                        )}
            <div className="w-full px-5">
                <ul className="text-black mt-2 flex flex-col">
                    <li className="flex items-center">
                        {item.category == "true" ? <PiDogBold  className='text-[#2F5382] text-lg' />
                        :
                        item.category == "macka" ? <FaCat className='text-[#2F5382] text-lg'/>
                        :
                        <SiAnimalplanet className='text-[#2F5382] text-xl'/>
                    }
                        <span className="pl-3">{item.petname.substring(0,20)}{item.petname.length > 10 ? "..." : ""}</span></li>
                    <li className="flex items-center">{item.spol == "musko" ? <IoIosMale className='text-[#2F5382] text-lg' /> : <IoMaleFemale className='text-red-600 text-xl'/>}<span className="pl-3">{item.spol}</span></li>
                    <li className="flex items-center"><IoLocationOutline className='text-[#2F5382] text-lg'/><span className="pl-3">{item.location}</span></li>
                </ul>
            
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="btn border-[#2F5382] bg-[#2F5382] text-lg text-white hover:bg-white hover:text-[#2F5382]">Pročitaj više...</p>
        </div>
            </Link> 
    </div>   
    )})}
    </>
)
}

