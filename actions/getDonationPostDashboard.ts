'use server'
import axios from 'axios'

type Email = {
  email: string
}

interface DonationPostDashboard {
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

export async function getDonationPostDashboard({ email }: Email) {
  let response
  let sendEmail = email.toString()

  try {
    response = await axios.get<{ donation_post: DonationPostDashboard[] }>(
      'http://localhost:8080/getDonationPostDashboard',
      {
        params: { email: sendEmail },
      }
    )
    return response.data
  } catch (err) {
    console.log('error happened on server side', err)
    return { donation_post: [] }
  }
}
