"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// assets
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiDogBold } from "react-icons/pi";
import { FaCat } from "react-icons/fa";
import { SiAnimalplanet } from "react-icons/si";
import LoadingSpinner from "../globalComponents/Spinner";
import { format } from 'date-fns';
import CardItem from "./CardItem";


export default function AdoptPet() {


  return (
    <div className="min-h-screen pt-20 bg-[#f1f4f5] w-full text-black xxs:px-5 md:px-14">
      <div className='mt-2 grid gap-10 xxs:grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 w-full h-full'>
        <CardItem />
    </div>
    </div>
  );
}
