'use server'

import axios from 'axios'

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

interface FilterOptions {
  page?: number
  animal_category?: string
  post_category?: string
  location?: string
  date_from?: string
  date_to?: string
}

export async function getDonationPosts(filters: FilterOptions = {}) {
  let response

  try {
    response = await axios.get<{ donation_posts: DonationPost[] }>(
      'http://localhost:8080/getDonationPosts',
      {
        params: {
          page: filters.page || 1,
          animal_category: filters.animal_category,
          post_category: filters.post_category,
          location: filters.location,
          date_from: filters.date_from,
          date_to: filters.date_to,
        },
      }
    )
  } catch (err) {
    console.log('Error occurred on server side', err)
    return { donation_posts: [] }
  }

  return response.data
}
