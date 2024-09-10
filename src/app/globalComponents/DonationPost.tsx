'use server'
import Image from 'next/image'
import Link from 'next/link'
import { PiDogBold } from 'react-icons/pi'
import { FaCat } from 'react-icons/fa'
import { SiAnimalplanet } from 'react-icons/si'
import { IoLocationOutline } from 'react-icons/io5'
import { getDonationPosts } from '@public/actions/getDonationPostHome'
import formatDate from '../dateHelper/date'
import { notFound } from 'next/navigation'

interface DonationPost {
  id: number
  image_paths: string
  post_category: string
  animal_category: string
  post_name: string
  phonenumber: string
  description: string
  location: string
  slug: string
  created_at: string
}

export default async function DonationPost() {
  const response = await getDonationPosts()
  console.log('RSPONSE', response)

  const post: DonationPost[] = response.donation_post || []
  if (!post.length) console.log('NOT FOUND')

  return (
    <>
      {post.map((item) => {
        const imagePaths =
          typeof item.image_paths === 'string'
            ? (item.image_paths as string).replace(/[{}]/g, '').split(',')
            : [] // Fallback to empty array if image_paths is not a string
        // imagePaths.map((path: string, index: number) =>
        //   console.log('FOTKE', path, index)
        // )

        const firstImagePath = imagePaths[0] || ''

        return (
          <div
            className="relative rounded-xl my-5 w-full pb-2 shadow-2xl overflow-hidden group"
            key={item.id}
          >
            <Link href={`/donationDetails/${item.slug}`}>
              <Image
                src={`http://localhost:8080/${firstImagePath}`}
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
                </ul>
                <p className="text-sm text-center py-2 text-gray-600">
                  Objavljeno: {formatDate(item.created_at)}
                </p>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="btn border-[#2F5382] bg-[#2F5382] text-lg text-white hover:bg-white hover:text-[#2F5382]">
                  Pročitaj više...
                </p>
              </div>
            </Link>
          </div>
        )
      })}
    </>
  )
}
