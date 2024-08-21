'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale, IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";
import { getAdoptPostDashboard } from '@public/actions/getAdoptPost';
import { notFound, useRouter } from 'next/navigation';
import LoadingSpinner from '../globalComponents/Spinner';
import CreatePost from './CreatePost';
import { UseAuth } from '../AuthContext';

interface AdoptPostItem{
  id: number,
  image_paths: string[],
  category: string,
  petname: string,
  location: string,
  spol: string,
  starost: string,
  slug: string,
  created_at: string
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


export default function AllAnimals() {
  const [animalPost, setAnimalPost] = useState<AdoptPostItem[]>([]);
  const [message, setMessage] = useState<string>("Ucitavanje...")
  const router = useRouter()
  const {email,loading} = UseAuth()

  useEffect(()=>{
    
      fetchPost(email)
    
  },[email])  


  const fetchPost = async (email:any) =>{
    if(!email) return
    try {
        if(email){
        const response = await getAdoptPostDashboard({email})
        const processedPost: AdoptPostItem[] = response.adopt_post.map((postItem) => {
            const imagePaths = typeof postItem.image_paths === 'string'
            ? ((postItem.image_paths as string)
                .replace(/{|}/g, '') // Remove curly braces
                .split(',') // Split by comma
                .map((path: string) => path.trim())) // Trim whitespace
            : postItem.image_paths;
          return {
            ...postItem,
            image_paths: imagePaths
          }
        })
        setAnimalPost(processedPost)
    }}
        catch (err){
            console.log("error happened", err)
        }
      }

      if(loading) return <LoadingSpinner/>

  return (
    <div>
         {
      animalPost.map(item => {
        return (
          <div className="h-auto rounded-xl my-5 w-full pb-2" key={item.id}>
            <Image
              src={`http://localhost:8080/${item.image_paths[0]}`}
              alt={item.petname}
              height={50}
              width={50}
              unoptimized
              className="object-cover rounded-2xl h-[20vh] bg-purple-400 w-full"
            />
            <div className="w-full">
              <ul className="text-black mt-2 flex flex-col">
                <li className="flex items-center">
                  {item.category === "pas" ? <PiDogBold className='text-[#2F5382] text-lg' />
                    : item.category === "macka" ? <FaCat className='text-[#2F5382] text-lg' />
                      : <SiAnimalplanet className='text-[#2F5382] text-xl' />
                  }
                  <span className="pl-3">{item.petname.substring(0, 20)}{item.petname.length > 10 ? "..." : ""}</span>
                </li>
                <li className="flex items-center">{item.spol === "musko" ? <IoIosMale className='text-[#2F5382] text-lg' /> : <IoMaleFemale className='text-red-600 text-xl' />}<span className="pl-3">{item.spol}</span></li>
                <li className="flex items-center"><IoLocationOutline className='text-[#2F5382] text-lg' /><span className="pl-3">{item.location}</span></li>
                <li className="flex items-center"><MdOutlinePets className='text-[#2F5382] text-lg' /><span className="pl-3">{item.starost}</span></li>
              </ul>
              <Link
                href={`/animalDetails/${item.slug}`}
                className="btn bg-white text-lg text-[#2F5382] border-[#2F5382] rounded-full w-full mt-5
                 hover:bg-[#2F5382] hover:text-white">Pogledaj detalje</Link>
              <p className='text-sm text-center py-2 text-gray-600'>Objavljeno: {formatDate(item.created_at)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
