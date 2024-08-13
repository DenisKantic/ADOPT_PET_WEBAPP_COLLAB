"use client"
import React, { cache, useCallback, useEffect, useState } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { IoIosMale } from "react-icons/io";
import { IoMaleFemale } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { PiSyringe } from "react-icons/pi";
import { GrCircleInformation } from "react-icons/gr";
import { TbEPassport } from "react-icons/tb";
import { getOneAdoptPost } from '@public/actions/getAdoptPost';

interface OneAdoptPost {
    id: number,
    image_paths: string[],
    category: string,
    petname: string,
    phonenumber: string,
    description: string,
    vakcinisan: boolean,
    cipovan: boolean,
    pasos: boolean,
    spol: string,
    starost: string,
    location: string,
}
type Props = {
    params: {
        slug: string
    }
}

const usernameLength = (user: string) => {
    if (user.length > 15) {
        return user.substring(0, 15) + "...";
    } else {
        return user;
    }
}

export default function AnimalDetails({ params: { slug } }: Props) {
    
    console.log("SLUG I RECEIVE", slug)
    const[post, setPost] = useState<OneAdoptPost | null>(null);
    const [loading,setLoading] = useState(false)
    
    const fetchPost = async () =>{
    try {
        const response = await getOneAdoptPost(slug)
        const postItem = response.adopt_post;

        // Process image_paths if it's a string
        const imagePaths = typeof postItem.image_paths === 'string'
            ? (postItem.image_paths as string)
                .replace(/{|}/g, '') // Remove curly braces
                .split(',') // Split by comma
                .map((path: string) => path.trim()) // Trim whitespace
            : postItem.image_paths;

        const processedPost: OneAdoptPost = {
            ...postItem,
            image_paths: imagePaths,
        };
        setPost(processedPost)
        console.log(processedPost)
        setLoading(false)
        }
        catch (err){
            console.log("error happened", err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchPost()
        setLoading(false)
    },[slug])

    if (loading) return <div>Loading...</div>;

    if (!post) return <div>Post not found</div>;

    console.log("IMAGE", post.image_paths)


    return (
        <div className='min-h-screen xxs:px-4 md:px-14 bg-white'>
            <div key={post.id}>
                <p className='pt-20 text-[#2F5382] text-xl font-bold'>{post.petname}</p>
                <div className='h-full w-full mx-auto flex gap-10 justify-between py-5 xxs:flex-col xl:flex-row'>
                    <div className='w-full'>
                        <Image
                            src={`http://localhost:8080/${post.image_paths[0]}`}
                            alt={post.petname}
                            height={50}
                            width={50}
                            unoptimized
                            className="object-cover rounded-2xl h-[60vh] w-full"
                        />
                        <div className='grid grid-rows-2 gap-10 w-full py-5 xxs:grid-cols-1 md:grid-cols-3'>
                            <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                                <div className='flex items-center'>
                                    <MdOutlinePets />
                                    <span className='ml-2'>Ime</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[#2F5382]'>{usernameLength(post.petname)}</span>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                                <div className='flex items-center'>
                                    <PiSyringe />
                                    <span className='ml-2'>Vakcinisan</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[#2F5382]'>{post.vakcinisan ? "DA" : "NE"}</span>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                                <div className='flex items-center'>
                                    <GrCircleInformation />
                                    <span className='ml-2'>Starost</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[#2F5382]'>{post.starost}</span>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                                <div className='flex items-center'>
                                    <TbEPassport />
                                    <span className='ml-2'>Pasoš</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[#2F5382]'>{post.pasos ? "DA" : "NE"}</span>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                                <div className='flex items-center'>
                                    {(post.spol === "musko" ? <IoIosMale /> : <IoMaleFemale />)}
                                    <span className='ml-2'>Spol</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[#2F5382]'>{post.spol}</span>
                                </div>
                            </div>

                            <div className='flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full'>
                                <div className='flex items-center'>
                                    <span className='ml-2'>Lokacija</span>
                                </div>
                                <div>
                                    <span className='font-bold text-[#2F5382]'>{post.location}</span>
                                </div>
                            </div>
                        </div>
                        <p className='text-xl text-[#2F5382] pb-5 font-bold'>Detaljan opis:</p>
                        <div className='w-full shadow-2xl min-h-[10vh] border-t-[#2F5382] border-2'>
                            <textarea value={post.description} className='w-full p-3 rounded-2xl h-[40vh] text-lg bg-white resize-none text-gray-800 overflow-hidden' disabled />
                        </div>
                    </div>

                    <div className='xxs:w-full md:w-[30%] h-full rounded-2xl shadow-2xl'>
                        <div className='w-full h-full p-5 flex flex-col justify-between items-start text-black'>
                            <p className='py-2 text-[#2F5382]'>Ime korisnika: <span className='text-black'>Username</span></p>
                            <p className='pb-2 text-[#2F5382]'>Broj telefona: <span className='text-black'>32233232</span></p>
                            <p className='pb-5 text-[#2F5382]'>Kreirano: <span className='text-black'>tetetee</span></p>

                            {/* <div className={ (user?.id == animal.post_id) ? 'w-full flex flex-col justify-between gap-5 pt-5' : "hidden"}> */}
                            <button className="btn bg-[#2F5382] text-lg text-white rounded-full w-full mt-5 hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">Uredi oglas</button>
                        </div>
                        <div className='w-[90%] h-[90%] text-black mt-10 mx-auto p-5 rounded-xl flex flex-col justify-center items-center'>
                        <Image
                            src="/images/logo.png"
                            alt="logo"
                            height={100}
                            width={100}
                            unoptimized
                            className='w-full object-cover'
                        />
                        <p>Vaše mjesto za reklamu</p>
                        <p>Kontaktirajte nas..</p>
                    </div>
                    </div>

                </div>
            </div>
                   
        </div>
    )
}
