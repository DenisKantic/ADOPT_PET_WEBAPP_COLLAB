import React from "react";
import Image from "next/image";
import Link from "next/link";
// libs
import { db } from "@public/lib/db";
// components
import MenuFilter from "../globalComponents/MenuFilter";
import CardItem from "../globalComponents/CardItem";
// assets
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";

export default async function LostPets(){

  const post = await db.lostPetPost.findMany();

  return (
    <div className="min-h-screen pt-20 bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
        {/* <div className="w-full h-full py-5 flex flex-row items-center justify-start"></div> */}

        <div className="mt-2 grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-full h-full">
          {post.map((animal) => (
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
                    {animal.animalCategory == "pas" ? (
                      <PiDogBold className="text-[#2F5382] text-lg" />
                    ) : animal.animalCategory == "macka" ? (
                      <FaCat className="text-[#2F5382] text-lg" />
                    ) : (
                      <SiAnimalplanet className="text-[#2F5382] text-xl" />
                    )}
                    <span className="pl-3">
                      {animal.name.substring(0, 20)}
                      {animal.name.length > 10 ? "..." : ""}
                    </span>
                  </li>
                  {/* <li className="flex items-center">
                    {animal.spol == "musko" ? (
                      <IoIosMale className="text-[#2F5382] text-lg" />
                    ) : (
                      <IoMaleFemale className="text-red-600 text-xl" />
                    )}
                    <span className="pl-3">{animal.spol}</span>
                  </li> */}
                  <li className="flex items-center">
                    <IoLocationOutline className="text-[#2F5382] text-lg" />
                    <span className="pl-3">{animal.location}</span>
                  </li>
                  {/* <li className="flex items-center">
                    <MdOutlinePets className="text-[#2F5382] text-lg" />
                    <span className="pl-3">{animal.starost}</span>
                  </li> */}
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
                  {animal.createdAt.toLocaleDateString("bs-BA", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              {/* <h3 className="text-xl font-bold">{animal.petName}</h3>
              <p>Category: {animal.category}</p>
              <p>Vakcina: {animal.vakcina}</p>
              <p>Cipovan: {animal.cipovan}</p>
              <p>Pasos: {animal.pasos}</p>
              <p>Spol: {animal.spol}</p>
              <p>Starost: {animal.starost}</p>
              <p>Phone Number: {animal.phoneNumber}</p>
              <p>Description: {animal.description}</p> */}
            </div>
          ))}
        </div>
      </div>
  );
};

