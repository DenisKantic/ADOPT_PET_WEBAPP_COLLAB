'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoIosMale } from 'react-icons/io'
import { IoMaleFemale } from 'react-icons/io5'
import { MdOutlinePets } from 'react-icons/md'
import { GrCircleInformation } from 'react-icons/gr'
import { getOneLostPetPost } from '@public/actions/getLostPetPost'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface LostPetPost {
  id: number
  image_paths: string[]
  category: string
  petname: string
  phonenumber: string
  location: string
  description: string
  spol: string
  created_at: string
}
type Props = {
  params: {
    slug: string
  }
}

const usernameLength = (user: string) => {
  if (user.length > 15) {
    return user.substring(0, 15) + '...'
  } else {
    return user
  }
}

export default function LostPetDetails({ params: { slug } }: Props) {
  console.log('SLUG I RECEIVE', slug)
  const [post, setPost] = useState<LostPetPost | null>(null)
  const [loading, setLoading] = useState(false)
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getOneLostPetPost(slug)
        const postItem = response.lost_post
        console.log('HERE I GET RESPONSE', response.lost_post)

        // Process image_paths if it's a string
        const imagePaths =
          typeof postItem.image_paths === 'string'
            ? (postItem.image_paths as string)
                .replace(/{|}/g, '') // Remove curly braces
                .split(',') // Split by comma
                .map((path: string) => path.trim()) // Trim whitespace
            : postItem.image_paths

        const processedPost: LostPetPost = {
          ...postItem,
          image_paths: imagePaths,
        }
        setPost(processedPost)
        setLoading(false)
      } catch (err) {
        console.log('error happened', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
    setLoading(false)
  }, [slug])

  const openFullscreen = (index: number) => {
    setCurrentSlide(index)
    setFullscreen(true)
  }

  const closeFullscreen = () => {
    setFullscreen(false)
  }

  if (loading) return <div>Loading...</div>

  if (!post) return <div>Post not found</div>

  console.log('IMAGES', post.image_paths)

  return (
    <div className="min-h-screen xxs:px-4 md:px-20 bg-white overflow-hidden">
      <p className="pt-20 text-[#2F5382] text-xl font-bold">{post.petname}</p>

      <div className="h-full w-full mx-auto py-5 flex justify-between xxs:flex-col xl:flex-row ">
        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            keyboard
            pagination={{ clickable: true }}
            navigation={{}} // Enable navigation
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {post.image_paths.map((url, index) => (
              <SwiperSlide className="h-[60vh] w-full" key={index}>
                <Image
                  alt={post.petname}
                  height={50}
                  width={50}
                  unoptimized
                  priority={true}
                  className="w-[90%] mx-auto h-[60svh] object-cover cursor-pointer"
                  src={`http://localhost:8080/${url}`}
                  // onClick={() => openFullscreen(index)} // Open fullscreen on click
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="grid grid-rows-2 gap-10 w-full py-5 xxs:grid-cols-1 md:grid-cols-3">
            <div className="flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full">
              <div className="flex items-center">
                <MdOutlinePets />
                <span className="ml-2">Ime</span>
              </div>
              <div>
                <span className="font-bold text-[#2F5382]">
                  {usernameLength(post.petname)}
                </span>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center bg-[#2F53821F] text-black p-5 h-[3rem] rounded-full">
              <div className="flex items-center">
                {post.spol === 'musko' ? <IoIosMale /> : <IoMaleFemale />}
                <span className="ml-2">Spol</span>
              </div>
              <div>
                <span className="font-bold text-[#2F5382]">{post.spol}</span>
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
              className="w-full p-3 rounded-2xl h-[40vh] text-lg bg-white resize-none text-gray-800 overflow-hidden"
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
              <span className="text-black">{post.phonenumber}</span>
            </p>
            <p className="pb-5 text-[#2F5382]">
              Kreirano: <span className="text-black">{post.created_at}</span>
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
