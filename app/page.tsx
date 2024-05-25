import React from 'react';
import CardItem from './globalComponents/CardItem';


export default function Home() {


  return (
    <div className="min-h-screen bg-white text-black px-14">
      <h1 className="pt-20">Test page</h1>

      <div className='w-full h-full py-5 flex flex-row items-center justify-start'>
      </div>

    

      <div className="grid gap-10 xxs:grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
          <CardItem /> 
      </div>
    </div>
  );
}