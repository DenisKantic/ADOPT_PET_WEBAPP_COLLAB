"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';
import { bs } from 'date-fns/locale'; // Import Bosnian locale

// actions
import { getLostPetPost } from "@public/actions/paginationPost";
// assets
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";

type Post = {
  id: string;
  post_id: string;
  imageUrls: string[];
  location: string;
  username: string;
  name: string;
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

  const fetchData = async (page: number) => {
    const result = await getLostPetPost({ query: { page } });
    setPosts(result.post);
    setPage(result.page);
    setPageSize(result.pageSize);
    setTotal(result.total);
  };

  useEffect(() => {
    const currentPage = parseInt(searchParams.get("page") || "1", 5);
    fetchData(currentPage);
  }, [searchParams]);

  const handlePagination = (newPage: number) => {
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
      <p>Ukupno oglasa: {total}</p>
      <div className="mt-2 grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full h-full">
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
      <div className="pagination flex justify-center gap-5 mt-5 pb-5">
        <button
          className="px-4 py-2 bg-green-400 disabled:bg-gray-00 rounded-lg"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </button>
        {/* {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded-lg`}
            onClick={() => handlePagination(i + 1)}
          >
            {i + 1}
          </button>
        ))} */}
        <button
        className="px-4 py-2 bg-green-400 disabled:bg-gray-300 rounded-lg"
        value={Math.ceil(total / pageSize)}
        >
        </button>
        <button
          className="px-4 py-2 bg-green-400 disabled:bg-gray-300 rounded-lg"
          onClick={handleNextPage}
          disabled={page === Math.ceil(total / pageSize)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
