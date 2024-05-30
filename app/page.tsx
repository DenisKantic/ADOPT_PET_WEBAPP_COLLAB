import React from 'react';
import CardItem from './globalComponents/CardItem';


export default function Home() {


  return (
    <div className="min-h-screen bg-white w-full text-black px-14">
      
      <div className='flex justify-center gap-10 items-center pt-20'>
        <button className='btn btn-warning'>Udomi zivotinju</button>
        <button className='btn btn-warning'>Pomozi zivotinji</button>
        <button className='btn btn-warning'>Izgubljene zivotinje</button>
        <button className='btn btn-warning'>Donacijski oglasi</button>
        <button className='btn btn-warning'>Vet. stanice</button>

      </div>

      <div className='flex justify-between items-center pt-20 xxs:flex-col md:flex-row'>
        <p className='text-2xl'>Udomi svog ljubimca</p>
      <p className='btn btn-info'>Pogledaj sve zivotinje</p>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          <p className='w-full h-full bg-red-400 p-5'>reklama</p>
          <CardItem/> 
      </div>

      <div className='flex justify-between items-center pt-10 xxs:flex-col md:flex-row'>
        <p className='text-2xl'>Izgubljene zivotinje</p>
      <p className='btn btn-info'>Pogledaj ostale izgubljene zivotinje</p>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          <CardItem/> 
      </div>

      <div className='flex justify-between items-center pt-10 xxs:flex-col md:flex-row'>
        <p className='text-2xl'>Pomozi zivotinji:</p>
      <p className='btn btn-info'>Pogledaj sve objave</p>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          <CardItem/> 
      </div>

      <div className='flex justify-between items-center pt-10 xxs:flex-col md:flex-row'>
        <p className='text-2xl'>Donacije:</p>
      <p className='btn btn-info'>Pogledaj sve donacije</p>
      </div>
      <div className="grid gap-10 xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          <CardItem/> 
      </div>

      
    </div>
  );
}