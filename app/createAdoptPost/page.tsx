import React from 'react'
import { Metadata } from 'next';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Kreiraj objavu",
  };

export default async function CreateAdoptPost() {

    const session = await getSession()
    const user = session?.user;
  
    if(!user){
        redirect("/")
    }
  return (
    <div className='h-screen w-full bg-gray-200 px-10 py-20'>
        <div className='w-[60%] bg-gray-100 mx-auto h-[50vh]'>
            <h1 className='text-2xl text-center py-10 font-bold tracking-wide'>Kreiraj objavu</h1>

            <form action="#" className='flex flex-col items-start'>

            <label className="text-lg">
                Ime ljubimca
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 w-[50%] text-lg"
            name="text"
            type="ime_ljubimca"
            placeholder="Upišite ime ljubimca"
            required
            />
            <br />

            <div className='flex items-center'>
                <label htmlFor="">
                    Vakcinisan: 
                </label>
                <button className='btn btn-outline btn-info mx-5'>DA</button>
                <button className='btn btn-outline btn-error'>NE</button>

                <br />

                <label htmlFor="">
                    Spol: 
                </label>
                <button className='btn btn-outline btn-info mx-5'>Muško</button>
                <button className='btn btn-outline btn-error'>Žensko</button>
           </div>
            <br />


            </form>
        </div>
    </div>
  )
}
