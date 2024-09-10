'use server'
import React from 'react'
import Image from 'next/image'
import { IoIosMale } from 'react-icons/io'
import { IoMaleFemale } from 'react-icons/io5'
import { MdOutlinePets } from 'react-icons/md'
import { GrCircleInformation } from 'react-icons/gr'
import ImagesSlide from '@public/src/app/globalComponents/ImagesSlide'
import formatDate from '@/app/dateHelper/date'
import { getOneDonationPost } from '@public/actions/getDonationPostDashboard'

interface DonationPost {
  id: number
  image_paths: string[]
  animal_category: string
  post_category: string
  post_name: string
  phone_number: string
  location: string
  description: string
  username: string
  created_at: string
}
type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params: { slug } }: Props) {
  const response = await getOneDonationPost(slug)
  const post = response.donation_post

  return {
    title: post.post_name || 'Detalji životinje',
  }
}

const usernameLength = (user: string) => {
  if (user.length > 15) {
    return user.substring(0, 15) + '...'
  } else {
    return user
  }
}

export default async function DonationDetails({ params: { slug } }: Props) {
  let post: DonationPost | null = null

  try {
    const response = await getOneDonationPost(slug)
    const postItem = response.donation_post

    const imagePaths =
      typeof postItem.image_paths === 'string'
        ? (postItem.image_paths as string)
            .replace(/{|}/g, '') // Remove curly braces
            .split(',') // Split by comma
            .map((path: string) => path.trim()) // Trim whitespace
        : postItem.image_paths

    post = {
      ...postItem,
      image_paths: imagePaths,
    }
  } catch (error) {
    console.error('Error fetching post:', error)
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="min-h-screen xxs:px-4 md:px-20 bg-white overflow-hidden focus:outline-none">
      <p className="pt-5 text-[#2F5382] text-xl font-bold">{post.post_name}</p>

      <div className="h-full w-full mx-auto py-5 flex justify-between xxs:flex-col xl:flex-row ">
        <div className="w-full">
          <ImagesSlide post={post} />
          <div className="grid grid-rows-1 gap-5 w-full py-5 xxs:grid-cols-1 md:grid-cols-3">
            <div className="flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full">
              <div className="flex items-center">
                <MdOutlinePets />
                <span className="ml-2">Ime</span>
              </div>
              <div>
                <span className="font-bold text-[#2F5382]">
                  {usernameLength(post.post_name)}
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full">
              <div className="flex items-center">
                {post.post_category === 'musko' ? (
                  <IoIosMale />
                ) : (
                  <IoMaleFemale />
                )}
                <span className="ml-2">Spol</span>
              </div>
              <div>
                <span className="font-bold text-[#2F5382]">
                  {post.post_category}
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full">
              <div className="flex items-center">
                <span className="ml-2">Lokacija</span>
              </div>
              <div>
                <span className="font-bold text-[#2F5382]">
                  {post.location}
                </span>
              </div>
            </div>
          </div>
          <p className="text-xl text-[#2F5382] pb-5 font-bold">
            Detaljan opis:
          </p>
          <div className="w-full shadow-2xl min-h-[10vh] border-t-[#2F5382] border-2">
            <textarea
              value={post.description}
              className="w-full p-3 rounded-2xl h-[20vh] text-lg bg-white resize-none text-gray-800 overflow-hidden"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="xxs:w-full rounded-2xl shadow-2xl">
        <div className="w-full h-full p-5 grid grid-cols-2 text-black">
          <div className="flex flex-col items-start justify-center">
            <p className="py-2 text-[#2F5382]">
              Ime korisnika: <span className="text-black">Test</span>
            </p>
            <p className="pb-2 text-[#2F5382]">
              Broj telefona:{' '}
              <span className="text-black">{post.phone_number}</span>
            </p>
            <p className="pb-5 text-[#2F5382]">
              Kreirano:{' '}
              <span className="text-black">{formatDate(post.created_at)}</span>
            </p>
          </div>
          <div className="text-black mx-auto rounded-xl flex flex-col justify-center items-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              height={100}
              width={100}
              unoptimized
              className="object-cover"
            />
            <p>Vaše mjesto za reklamu</p>
            <p>Kontaktirajte nas..</p>
          </div>
        </div>
      </div>
    </div>
  )
}
