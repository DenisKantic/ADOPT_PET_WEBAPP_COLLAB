"use client"
import CardItem from '@/app/globalComponents/CardItem'
import AnimalFilter from "@/app/globalComponents/AnimalFilter"
import React,{useState} from 'react';

type Props = {
  filter:string
}

export default function Home() {


  return (
    <div className="min-h-screen bg-white text-black px-14">
      <h1 className="pt-20">Test page</h1>

      <AnimalFilter />

      <div className="grid gap-10 xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          
      </div>
    </div>
  );
}