"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';
// actions
import { getLostPetPost } from "@public/actions/paginationPost";
// assets
import { IoLocationOutline } from "react-icons/io5";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";
import { useTransition } from "react";
import LoadingSpinner from "../globalComponents/Spinner";
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";

type Post = {
  id: string;
  post_id: string;
  imageUrls: string[];
  location: string;
  username: string;
  name: string;
  spol: string;
  animalCategory: string;
  phoneNumber: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}; 

export default function LostPets() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [isPending, startTransition] = useTransition(); // loading state
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchData = (page: number) => {
    startTransition(async () => {
      const result = await getLostPetPost({ query: { page } });
      setPosts(result.post);
      setPage(result.page);
      setPageSize(result.pageSize);
      setTotal(result.total);
      setIsLoading(false); // Set loading to false after data is fetched
    });
  };

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    fetchData(currentPage);
  }, [searchParams]);

  const handlePagination = (newPage: number) => {
    setIsLoading(true); // Set loading to true when pagination changes
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/lostPet?${params.toString()}`);
  };

  const handleNextPage = () => {
    if (page < Math.ceil(total / pageSize)) {
      handlePagination(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      handlePagination(page - 1);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
      <p className={isPending ? "hidden" : "flex py-5 text-xl"}>Ukupno oglasa:<span className="font-bold ml-2"> {total}</span></p>
      {(isPending || isLoading) && <LoadingSpinner />}
      <div className={`mt-2 grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full h-full ${isLoading ? 'hidden' : 'grid'}`}>
        {posts.map((animal) => (
          <div key={animal.id} className="p-4 bg-white rounded-xl shadow-md">
            <Image
              src={animal.imageUrls[0]}
              alt={animal.name}
              height={50}
              width={50}
              unoptimized
              className="object-cover rounded-t-2xl md:h-[35vh] w-full"
            />
            <div className="w-full px-5">
              <ul className="text-black mt-2 flex flex-col">
                <li className="flex items-center">
                  {animal.animalCategory === "pas" ? (
                    <PiDogBold className="text-[#2F5382] text-lg" />
                  ) : animal.animalCategory === "macka" ? (
                    <FaCat className="text-[#2F5382] text-lg" />
                  ) : (
                    <SiAnimalplanet className="text-[#2F5382] text-xl" />
                  )}
                  <span className="pl-3">
                    {animal.name.substring(0, 20)}
                    {animal.name.length > 20 ? "..." : ""}
                  </span>
                </li>
                <li className="flex items-center">
                  {animal.spol == "musko" ? (
                    <IoIosMale className="text-[#2F5382] text-lg" />
                  ) : (
                    <IoMaleFemale className="text-red-600 text-xl" />
                  )}
                  <span className="pl-3">{animal.spol}</span>
                </li>
                <li className="flex items-center">
                  <IoLocationOutline className="text-[#2F5382] text-lg" />
                  <span className="pl-3">{animal.location}</span>
                </li>
              </ul>
              <Link
                href={`/lostPet/${animal.id}`}
                className="btn bg-white text-lg text-[#2F5382] border-[#2F5382] rounded-full w-full mt-5
                          hover:bg-[#2F5382] hover:text-white"
              >
                Pogledaj detalje
              </Link>
              <p className="text-sm text-center py-2 text-gray-600">
                Objavljeno:{" "}
                {format(new Date(animal.createdAt), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        ))}
      </div>
      {!isLoading && (
        <div className="join mx-auto w-full flex justify-center items-center py-10">
          <button 
            onClick={handlePreviousPage} 
            disabled={page === 1}
            className="join-item btn bg-[#2F5382] text-white disabled:bg-gray-700 disabled:text-gray-200"
          >
            Prethodna
          </button>
          <button 
            disabled 
            className="join-item btn disabled disabled:bg-white disabled:border-[#2F5382] disabled:text-[#2F5382]"
          >
            Stranica: {page + "/" + Math.ceil(total / pageSize) }
          </button>
          <button 
            onClick={handleNextPage} 
            disabled={page === Math.ceil(total / pageSize)}
            className="join-item btn bg-[#2F5382] text-white disabled:bg-gray-700 disabled:text-gray-200"
          >
            Sljedeća
          </button>
        </div>
      )}
    </div>
  );
}
