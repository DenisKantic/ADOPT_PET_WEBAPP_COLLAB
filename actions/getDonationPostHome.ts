'use server'

import axios from 'axios'

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

export async function getDonationPosts() {
  let response

  try {
    response = await axios.get<{ donation_post: DonationPost[] }>(
      'http://localhost:8080/getAllDonationPost'
    )
    console.log('RESPONSE HERE', response.data)
    return response.data
  } catch (err) {
    console.log('Error occurred on server side', err)
    return { donation_post: [] }
  }
}
