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
import { notFound } from 'next/navigation';
import { AdoptPost } from '@public/interface/types';
import { UseAuth } from '../AuthContext';

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
  const [animalPost, setAnimalPost] = useState<AdoptPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const {email} = UseAuth(); 

  console.log("EMAIL:", email)

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await getAdoptPostDashboard({email});
        if (response?.adopt_post) {
          setAnimalPost(response.adopt_post);
        } else {
          <p>Not found</p>
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        notFound(); // or handle the error appropriately
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!animalPost.length) {
    notFound();
  }

  return (
    <>
      {animalPost.map(item => {
        const imagePaths = typeof item.image_paths === 'string'
          ? (item.image_paths as string).replace(/[{}]/g, '').split(',')
          : [];

        const firstImagePath = imagePaths[0] || '';

        return (
          <div className="h-auto rounded-xl my-5 w-full pb-2" key={item.id}>
            <Image
              src={`http://localhost:8080/${firstImagePath}`}
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
    </>
  );
}
