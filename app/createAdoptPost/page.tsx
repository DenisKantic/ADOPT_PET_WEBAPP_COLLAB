import React from 'react'
import { Metadata } from 'next';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma'

export const metadata: Metadata = {
    title: "Kreiraj objavu",
  };


async function createPost(formData: FormData){
    "use server"

    const session = await getSession()
    const post_id = session?.user?.id;

    const petName = formData.get("name")?.toString();
    const vakcina = formData.get("vakcinisan")?.toString();
    const cipovan = formData.get("cipovan")?.toString();
    const pasos = formData.get("pasos")?.toString();
    const spol = formData.get("spol")?.toString();
    const starost = formData.get("starost")?.toString();
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const description = formData.get("description")?.toString();

    if(!post_id || !petName || !vakcina || !cipovan || !pasos || !spol || !starost || !phoneNumber || !description ){
        throw Error("Missing required fields")

    }

    await prisma.adoptAnimal.create({
        data: {post_id, petName, vakcina, cipovan, pasos, spol, starost, phoneNumber, description}
    })
}

export default async function CreateAdoptPost() {

    const session = await getSession()
    const user = session?.user;
  
    if(!user){
        redirect("/")
    }
  return (
    <div className='min-h-screen w-full bg-gray-200 px-10 py-20'>
        <div className='w-[50%] bg-gray-100 mx-auto min-h-[50vh] shadow-2xl rounded-md'>
            <h1 className='text-2xl text-black text-center py-10 font-bold tracking-wide'>Kreiraj objavu</h1>

            <form action={createPost} className='flex flex-col items-start w-full text-black p-5'>

             <label className="text-lg" htmlFor='name'>
                Ime ljubimca
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 w-[50%] text-lg"
            name="name"
            type='text'
            placeholder="Upišite ime ljubimca"
            required
            />
            <br />

            <div className="flex flex-col items-start">

                <div className='flex flex-col py-2'>
                    <label htmlFor="vakcinisan" className="py-2">Vakcinisan:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="vakcinisan" value="da" className="radio radio-info" />
                            <label htmlFor="vakcinisan" className="ml-3">Da</label>
                            
                            <input type="radio" name="vakcinisan" value="ne"  className="radio radio-error ml-5" />
                            <label htmlFor="vakcinisan" className="ml-3">Ne</label>
                    </div>
                </div>

                <div className='flex flex-col py-2'>
                    <label htmlFor="cipovan" className="py-2">Čipovan:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="cipovan" value="da" className="radio radio-info" />
                            <label htmlFor="cipovan" className="ml-3">Da</label>
                            
                            <input type="radio" name="cipovan" value="ne" className="radio radio-error ml-5" />
                            <label htmlFor="cipovan" className="ml-3">Ne</label>
                    </div>
                </div>

                <div className='flex flex-col py-2'>
                    <label htmlFor="pasos" className="py-2">Pasoš:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="pasos" value="da" className="radio radio-info" />
                            <label htmlFor="pasos" className="ml-3">Da</label>
                            
                            <input type="radio" name="pasos" value="ne" className="radio radio-error ml-5" />
                            <label htmlFor="pasos" className="ml-3">Ne</label>
                    </div>
                </div>

                <div className='flex flex-col py-2'>
                    <label htmlFor="spol" className="py-2">Spol:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="spol" value="musko" className="radio radio-info" />
                            <label htmlFor="spol" className="ml-3">Muško</label>
                            
                            <input type="radio" name="spol" value="zensko" className="radio radio-error ml-5" />
                            <label htmlFor="spol" className="ml-3">Žensko</label>
                    </div>
                </div>

                <div className='flex flex-col py-2'>
                    <label htmlFor="starost" className="py-2">Starost:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="starost" value="mladje" className="radio radio-info" />
                            <label htmlFor="starost" className="ml-3">Mlađe</label>
                            
                            <input type="radio" name="starost" value="odraslo" className="radio radio-error ml-5" />
                            <label htmlFor="starost" className="ml-3">Odraslo</label>

                            <input type="radio" name="starost" value="starije" className="radio radio-error ml-5" />
                            <label htmlFor="starost" className="ml-3">Starije</label>
                    </div>
                </div>
                
            </div>
               
            <br />

            <label className="text-lg" htmlFor='phoneNumber'>
                Broj telefona <span className='text-sm text-gray-600'>{"(061 - xxx -...)"}</span>
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 w-[50%] text-lg"
            name="phoneNumber"
            type='text'
            placeholder="Upišite broj telefona"
            required
            maxLength={15}
            />
            <br />

            <label className="text-lg" htmlFor='description'>
                Kratak opis
            </label>
            <textarea 
            required 
            name='description'
            maxLength={2000}
            className="textarea bg-white textarea-info mt-3 w-full h-[20vh]" 
            placeholder="Unesite kratak opis"/>
            <br />

            

            <button type='submit' className='btn btn-primary mx-auto'>Submit</button>
            </form>
        </div>
    </div>
  )
}
