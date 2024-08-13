"use client"
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios'
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
import { getAdoptPost } from '@public/actions/getAdoptPost';

interface AdoptPost{
    id: number,
    image_paths: string[],
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
    created_at: string;
}


export default function CardItem() {

    const[post, setPost] = useState<AdoptPost[]>([]);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    
    const fetchPost = async () =>{
    try {
        const response = await getAdoptPost()
        console.log("RESPONSE", response)
        const processedPost: AdoptPost[] = response.adopt_post.map((postItem) => {
            const imagePaths = typeof postItem.image_paths === 'string'
            ? (postItem.image_paths
                .replace(/{|}/g, '') // Remove curly braces
                .split(',') // Split by comma
                .map((path: string) => path.trim())) // Trim whitespace
            : postItem.image_paths;
          return {
            ...postItem,
            image_paths: imagePaths
          }
        })
        setPost(processedPost)
        console.log("SLUG", post[0].slug)
        setLoading(false)
    }
        catch (err){
            console.log("error happened", err)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchPost()
    },[])



const handlePageChange = (page:number)=>{

}


  return (
        <>
         {post.length === 0 ? (
                <p>No posts available</p>
            ) : (
        post.map((item)=>{

            // const imagePaths = Array.isArray(item.image_paths) ? item.image_paths : [];
            // const firstImagePath = imagePaths[0] || '';

            return (
                <div className="relative rounded-xl my-5 w-full pb-2 shadow-2xl overflow-hidden group" key={item.id}>
                <Link 
                   href={`/adoptPet/${item.slug}`} className=''>
                               <Image
                                   src={`http://localhost:8080/${item.image_paths[0]}`}
                                   alt={item.petname}
                                   height={50}
                                   width={50}
                                   unoptimized
                                   className="object-cover rounded-t-2xl xxs:h-[20vh] shadow-lg w-full"
                               />
               <div className="w-full px-5">
                   <ul className="text-black mt-2 flex flex-col">
                       <li className="flex items-center">
                       <MdOutlinePets className='text-[#2F5382] text-lg'/><span className="pl-3">{item.petname.substring(0,20)}</span></li>
                           <li className="flex items-center">
                           {item.category == "pas" ? <PiDogBold  className='text-[#2F5382] text-lg' />
                           :
                           item.category == "macka" ? <FaCat className='text-[#2F5382] text-lg'/>
                           :
                           <SiAnimalplanet className='text-[#2F5382] text-xl'/>
                       }
                           <span className="pl-3">{item.category}</span></li>
                       <li className="flex items-center">{item.spol == "musko" ? <IoIosMale className='text-[#2F5382] text-lg' /> : <IoMaleFemale className='text-red-600 text-xl'/>}<span className="pl-3">{item.spol}</span></li>
                       <li className="flex items-center"><IoLocationOutline className='text-[#2F5382] text-lg'/><span className="pl-3">{item.location}</span></li>
                   </ul>
               
               </div>
               <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <p className="btn border-[#2F5382] bg-[#2F5382] text-lg text-white hover:bg-white hover:text-[#2F5382]">Pročitaj više...</p>
           </div>
               </Link> 
       </div>    
    )}))}
     <div className="absolute bottom-0 bg-red-400 left-0 w-full flex items-center justify-center">
        <button
          className="btn btn-secondary  disabled:text-black disabled:bg-pink-200 text-black text-md"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
        >
          Prethodna
        </button>
        <span className="text-black text-sm px-4">
          {' '}
          Stranica {page} od {totalPages}{' '}
        </span>
        <button
          className="btn btn-primary text-black disabled:text-black disabled:bg-pink-200 text-md"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Sljedeća
        </button>
        </div>
    </>
)
}

