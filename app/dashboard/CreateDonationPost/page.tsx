import React from 'react'
import { Metadata } from 'next';
import getSession from '@/lib/getSession';
import { redirect} from 'next/navigation';
import { prisma } from '@/lib/prisma'
import FormSubmitButton from '@/app/globalComponents/FormSubmitButton';

export const metadata: Metadata = {
    title: "Kreiraj objavu",
  };


async function createPost(formData: FormData){
    "use server"

    const session = await getSession()
    const post_id = session?.user?.id;

    const category = formData.get("category")?.toString()
    const name = formData.get("name")?.toString();
    const animalCategory = formData.get("animalCategory")?.toString()
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const description = formData.get("description")?.toString();

    if(!post_id || !category || !name || !animalCategory || !phoneNumber || !description ){
        throw Error("Missing required fields")

    }

    await prisma.donationPost.create({
        data: {post_id, category, name, animalCategory, phoneNumber, description}
    })
    redirect("/dashboard")
}

export default async function DonationPost() {

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

            <div className='flex flex-col py-3'>

            <label htmlFor="category" className="py-2">Kategorija:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="category" value="lijekovi" className="radio radio-info" />
                            <label htmlFor="category" className="ml-3">Lijekovi</label>
                            
                            <input type="radio" name="category" value="hrana" className="radio radio-error ml-5" />
                            <label htmlFor="category" className="ml-3">Hrana</label>

                            <input type="radio" name="category" value="oprema" className="radio radio-error ml-5" />
                            <label htmlFor="category" className="ml-3">Oprema</label>
                    </div>

            <label className="text-lg pt-2" htmlFor='name'>
                Ime 
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 w-full text-lg"
            name="name"
            type='text'
            placeholder="Npr. vakcina, uzica itd.."
            required
            />     
            </div>


            <div className="flex flex-col items-start">

                <div className='flex flex-col py-2'>
                    <label htmlFor="animalCategory" className="py-2">Za:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="animalCategory" value="macka" className="radio radio-info" />
                            <label htmlFor="animalCategory" className="ml-3">Mačku</label>
                            
                            <input type="radio" name="animalCategory" value="pas" className="radio radio-error ml-5" />
                            <label htmlFor="animalCategory" className="ml-3">Psa</label>

                            <input type="radio" name="animalCategory" value="ostalo" className="radio radio-error ml-5" />
                            <label htmlFor="animalCategory" className="ml-3">Ostalo</label>
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

            

            <FormSubmitButton className='mx-auto'>Kreiraj Oglas</FormSubmitButton>
            </form>
        </div>
    </div>
  )
}
