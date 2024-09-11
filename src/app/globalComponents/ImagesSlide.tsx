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
    // Make sure state updates occur outside of rendering
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
              src={`https://www.petconnectbosnia.com/api/${url}`} // Make sure to replace with your actual domain
              onClick={() => openFullscreen(index)} // Open fullscreen on click
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="text-lg text-black font-bold text-center py-5">
        Kliknite na fotografiju za prikaz preko čitavog ekrana
      </p>

      {/* Fullscreen Overlay */}
      {fullscreen && (
        <div className="fixed h-screen inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
          <Swiper
            initialSlide={currentSlide}
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            pagination={{ clickable: true }}
            navigation={{}} // Enable navigation
            slidesPerView={1}
            scrollbar={{ draggable: true }}
            className="w-full h-[90svh]"
          >
            {post.image_paths.map((url: string, index: number) => (
              <SwiperSlide
                className="w-full h-[90svh] flex items-center justify-center"
                key={index}
              >
                <Image
                  alt={post.petname}
                  height={1000}
                  width={1000}
                  unoptimized
                  className="p-5 object-contain h-[85svh] w-[90%] mx-auto"
                  src={`https://www.petconnectbosnia.com/api/${url}`} // Make sure to replace with your actual domain
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            onClick={closeFullscreen}
            className="absolute hover:cursor-pointer top-4 right-4 text-white text-xl font-bold z-60"
          >
            Zatvori
          </button>
        </div>
      )}
    </div>
  )
}
