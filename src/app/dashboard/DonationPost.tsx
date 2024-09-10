'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PiDogBold } from 'react-icons/pi'
import { FaCat } from 'react-icons/fa'
import { SiAnimalplanet } from 'react-icons/si'
import { IoLocationOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '../globalComponents/Spinner'
import { UseAuth } from '../AuthContext'
import { DeleteAdoptPost } from '@public/actions/deletePost'
import formatDate from '../dateHelper/date'
import { getDonationPostDashboard } from '@public/actions/getDonationPostDashboard'
import CreateDonationPost from './CreateDonationPost'

interface DonationPost {
  id: number
  image_paths: string[]
  animal_category: string
  post_category: string
  post_name: string
  phone_number: string
  description: string
  location: string
  slug: string
  created_at: string
}

export default function DonationPost() {
  const [donationPost, setDonationPost] = useState<DonationPost[]>([])
  const [message, setMessage] = useState<string>('Ucitavanje...')
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const { email } = UseAuth()
  const postCounter = donationPost.length

  console.log('EMAIL HERE TESTING TESTING', email)

  const fetchPost = async (email: any) => {
    if (!email) {
      router.refresh()
    }
    try {
      const response = await getDonationPostDashboard({ email })
      const processedPost: DonationPost[] = response.donation_post.map(
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
      setDonationPost(processedPost)
      setLoading(false)
    } catch (err) {
      console.log('error happened', err)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    fetchPost(email)
    setLoading(false)
  }, [email])

  if (loading) return <LoadingSpinner />

  return (
    <>
      {donationPost.map((item) => {
        return (
          <div
            className="relative rounded-xl my-5 w-full pb-2 shadow-2xl overflow-hidden group"
            key={item.id}
          >
            <Image
              src={`http://localhost:8080/${item.image_paths[0]}`}
              alt={item.post_name}
              height={50}
              width={50}
              unoptimized
              className="object-cover overflow-hidden h-[20vh] shadow-xl w-full"
            />
            <div className="w-full px-5">
              <ul className="text-black mt-2 flex flex-col">
                <li className="flex items-center">
                  {item.animal_category === 'pas' ? (
                    <PiDogBold className="text-[#2F5382] text-lg" />
                  ) : item.animal_category === 'macka' ? (
                    <FaCat className="text-[#2F5382] text-lg" />
                  ) : (
                    <SiAnimalplanet className="text-[#2F5382] text-xl" />
                  )}
                  <span className="pl-3">
                    {item.post_name.substring(0, 20)}
                    {item.post_name.length > 10 ? '...' : ''}
                  </span>
                </li>
                <li className="flex items-center">
                  {item.post_category === 'Lijek' ? (
                    <PiDogBold className="text-[#2F5382] text-lg" />
                  ) : item.post_category === 'Hrana' ? (
                    <FaCat className="text-[#2F5382] text-lg" />
                  ) : (
                    <SiAnimalplanet className="text-[#2F5382] text-xl" />
                  )}
                  <span className="pl-3">{item.post_category}</span>
                </li>
                <li className="flex items-center">
                  <IoLocationOutline className="text-[#2F5382] text-lg" />
                  <span className="pl-3">{item.location}</span>
                </li>
                {/*
                <li className="flex items-center">
                  <MdOutlinePets className="text-[#2F5382] text-lg" />
                  <span className="pl-3">{item.starost}</span>
                </li> */}
              </ul>
              <p className="text-sm text-center py-2 text-gray-600">
                Objavljeno: {formatDate(item.created_at)}
              </p>
            </div>
            <div className="absolute inset-0 bg-black px-20 gap-5 bg-opacity-70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={`/dashboard/donationDetails/${item.slug}`}
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
              <button
                className="btn border-[#2F5382] w-full bg-red-400 text-lg text-white hover:bg-white hover:text-[#2F5382]"
                onClick={async () => {
                  console.log('ID TEST', item.id)
                  const response = await DeleteAdoptPost(item.id)
                  if (response?.success) {
                    router.push('/dashboard')
                  } else {
                    alert('shit')
                  }
                }}
              >
                Obriši
              </button>
            </div>
          </div>
        )
      })}
      <CreateDonationPost postCounter={postCounter} />
    </>
  )
}
