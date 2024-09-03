'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IoIosMale } from 'react-icons/io'
import { IoMaleFemale } from 'react-icons/io5'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlinePets } from 'react-icons/md'
import { PiDogBold } from 'react-icons/pi'
import { FaCat } from 'react-icons/fa'
import { SiAnimalplanet } from 'react-icons/si'
import { getDonationPosts } from '@public/actions/getDonationPostHome'
import FilterMenu from './FilterMenu'

interface FilterOptions {
  page?: number
  animal_category?: string
  post_category?: string
  location?: string
  date_from?: string
  date_to?: string
}

interface DonationPost {
  id: number
  image_paths: string
  postCategory: string
  animal_category: string
  post_name: string
  phonenumber: string
  description: string
  location: string
  slug: string
  created_at: string
}

export default function CardItem() {
  const [posts, setPosts] = useState<DonationPost[]>([])
  const [filters, setFilters] = useState<FilterOptions>({})
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const data = await getDonationPosts({ ...filters, page })
      setPosts(data.donation_posts)
    }

    fetchData()
  }, [filters, page])

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters)
    setPage(1) // Reset to the first page when filters change
  }

  const handleNextPage = () => setPage((prevPage) => prevPage + 1)
  const handlePreviousPage = () =>
    setPage((prevPage) => Math.max(prevPage - 1, 1))

  //   const fetchPost = async () => {
  //     try {
  //       const response = await getAdoptPost()
  //       const processedPost: AdoptPost[] = response.adopt_post.map((postItem) => {
  //         const imagePaths =
  //           typeof postItem.image_paths === 'string'
  //             ? (postItem.image_paths as string)
  //                 .replace(/{|}/g, '') // Remove curly braces
  //                 .split(',') // Split by comma
  //                 .map((path: string) => path.trim()) // Trim whitespace
  //             : postItem.image_paths
  //         return {
  //           ...postItem,
  //           image_paths: imagePaths,
  //         }
  //       })
  //       setPost(processedPost)
  //     } catch (err) {
  //       console.log('error happened', err)
  //     }
  //   }

  //   const handlePageChange = (page: number) => {}

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Donation Posts</h1>
      <FilterMenu onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{post.post_name}</h2>
            <p>{post.description}</p>
            <p>Location: {post.location}</p>
            <p>Animal Category: {post.animal_category}</p>
            {/* Display other fields as needed */}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}
