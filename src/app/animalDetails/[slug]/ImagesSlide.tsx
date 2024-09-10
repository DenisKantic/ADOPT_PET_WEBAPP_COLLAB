'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type Props = {
  post: any
}

export default function ImagesSlide({ post }: any) {
  const [fullscreen, setFullscreen] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const openFullscreen = (index: number) => {
    setCurrentSlide(index)
    setFullscreen(true)
  }

  const closeFullscreen = () => {
    setFullscreen(false)
  }

  return (
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
        {post.image_paths.map((url: string, index: number) => (
          <SwiperSlide className="h-[60vh] w-full" key={index}>
            <Image
              alt={post.petname}
              height={50}
              width={50}
              unoptimized
              className="w-[90%] mx-auto h-[60svh] object-cover cursor-pointer"
              src={`http://localhost:8080/${url}`}
              // onClick={() => openFullscreen(index)} // Open fullscreen on click
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
