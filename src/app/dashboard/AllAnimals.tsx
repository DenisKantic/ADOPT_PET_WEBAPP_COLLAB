'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosMale } from 'react-icons/io'
import { IoMaleFemale, IoLocationOutline } from 'react-icons/io5'
import { MdOutlinePets } from 'react-icons/md'
import { PiDogBold } from 'react-icons/pi'
import { FaCat } from 'react-icons/fa'
import { SiAnimalplanet } from 'react-icons/si'
import { getAdoptPostDashboard } from '@public/actions/getAdoptPost'
import { notFound, useRouter } from 'next/navigation'
import LoadingSpinner from '../globalComponents/Spinner'
import { UseAuth } from '../AuthContext'

interface AdoptPostItem {
  id: number
  image_paths: string[]
  category: string
  petname: string
  location: string
  spol: string
  starost: string
  slug: string
  created_at: string
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)

  // Format to dd/mm/yy
  return date.toLocaleDateString('bs-BA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function AllAnimals() {
  const [animalPost, setAnimalPost] = useState<AdoptPostItem[]>([])
  const [message, setMessage] = useState<string>('Ucitavanje...')
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { email } = UseAuth()

  console.log('EMAIL HERE TESTING TESTING', email)

  const fetchPost = async (email: any) => {
    try {
      const response = await getAdoptPostDashboard({ email })
      const processedPost: AdoptPostItem[] = response.adopt_post.map(
        (postItem) => {
          const imagePaths =
            typeof postItem.image_paths === 'string'
              ? (postItem.image_paths as string)
                  .replace(/{|}/g, '') // Remove curly braces
                  .split(',') // Split by comma
                  .map((path: string) => path.trim()) // Trim whitespace
              : postItem.image_paths
          return {
            ...postItem,
            image_paths: imagePaths,
          }
        }
      )
      setAnimalPost(processedPost)
    } catch (err) {
      console.log('error happened', err)
    }
  }

  useEffect(() => {
    fetchPost(email)
    setLoading(false)
  }, [email])

  if (loading) return <LoadingSpinner />

  return (
    <>
      {animalPost.map((item) => {
        return (
          <div
            className="relative rounded-xl my-5 w-full pb-2 shadow-2xl overflow-hidden group"
            key={item.id}
          >
            <Image
              src={`http://localhost:8080/${item.image_paths[0]}`}
              alt={item.petname}
              height={50}
              width={50}
              unoptimized
              className="object-cover h-[20vh] shadow-xl w-full"
            />
            <div className="w-full px-5">
              <ul className="text-black mt-2 flex flex-col">
                <li className="flex items-center">
                  {item.category === 'pas' ? (
                    <PiDogBold className="text-[#2F5382] text-lg" />
                  ) : item.category === 'macka' ? (
                    <FaCat className="text-[#2F5382] text-lg" />
                  ) : (
                    <SiAnimalplanet className="text-[#2F5382] text-xl" />
                  )}
                  <span className="pl-3">
                    {item.petname.substring(0, 20)}
                    {item.petname.length > 10 ? '...' : ''}
                  </span>
                </li>
                <li className="flex items-center">
                  {item.spol === 'musko' ? (
                    <IoIosMale className="text-[#2F5382] text-lg" />
                  ) : (
                    <IoMaleFemale className="text-red-600 text-xl" />
                  )}
                  <span className="pl-3">{item.spol}</span>
                </li>
                <li className="flex items-center">
                  <IoLocationOutline className="text-[#2F5382] text-lg" />
                  <span className="pl-3">{item.location}</span>
                </li>
                <li className="flex items-center">
                  <MdOutlinePets className="text-[#2F5382] text-lg" />
                  <span className="pl-3">{item.starost}</span>
                </li>
              </ul>
              <p className="text-sm text-center py-2 text-gray-600">
                Objavljeno: {formatDate(item.created_at)}
              </p>
            </div>
            <div className="absolute inset-0 bg-black px-20 gap-5 bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={`/adoptPet/${item.slug}`}
                className="btn border-[#2F5382] w-full bg-[#2F5382] text-lg text-white hover:bg-white hover:text-[#2F5382]"
              >
                Pročitaj više...
              </Link>
              <Link
                href={`/adoptPet/${item.slug}`}
                className="btn border-[#2F5382] w-full bg-[#2F5382] text-lg text-white hover:bg-white hover:text-[#2F5382]"
              >
                Uredi
              </Link>
              <Link
                href={`/adoptPet/${item.slug}`}
                className="btn border-[#2F5382] w-full bg-red-400 text-lg text-white hover:bg-white hover:text-[#2F5382]"
              >
                Obriši
              </Link>
            </div>
          </div>
        )
      })}
    </>
  )
}
