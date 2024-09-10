'use server'
import axios from 'axios'

interface AdoptPost {
  id: number
  image_paths: string[]
  category: string
  petname: string
  phonenumber: string
  description: string
  vakcinisan: boolean
  cipovan: boolean
  pasos: boolean
  spol: string
  starost: string
  location: string
  slug: string
  created_at: string
}

interface OneAdoptPost {
  id: number
  image_paths: string[]
  category: string
  petname: string
  phonenumber: string
  description: string
  vakcinisan: boolean
  cipovan: boolean
  pasos: boolean
  spol: string
  starost: string
  username: string
  location: string
  created_at: string
}

type Email = {
  email: Object
}

try {
    response = await axios.get<{
      adopt_post: AdoptPost[]
      totalPages: number
      currentPage: number
    }>(
      `https://www.petconnectbosnia.com/api/getAdoptPostHome?page=${page}&pageSize=${PAGE_SIZE}&location=${encodeURIComponent(
        location
      )}`
    )
    return response.data
  } catch (err) {
    console.log('error happened on server side', err)
    return { adopt_post: [], totalPages: 0, currentPage: 1 }
  }
}


export async function getAdoptPostDashboard({ email }: Email) {
  let response
  let sendEmail = email.toString()

  try {
    response = await axios.get<{ adopt_post: AdoptPost[] }>(
      'https://www.petconnectbosnia.com/api/getAdoptPostDashboard',
      {
        params: { email: sendEmail },
      }
    )
    return response.data
  } catch (err) {
    console.log('error happened on server side', err)
    return { adopt_post: [] }
  }
}

export async function getOneAdoptPost(slug: string) {
  let response

  try {
    response = await axios.get<{ adopt_post: OneAdoptPost }>(
      `https://www.petconnectbosnia.com/api/getOneAdoptPost/${slug}?slug=${slug}`
    )
    return response.data
  } catch (err) {
    console.log('Error happened on server side', err)
    return {
      adopt_post: {
        id: 0,
        image_paths: [],
        category: '',
        petname: '',
        username: '',
        phonenumber: '',
        description: '',
        vakcinisan: false,
        cipovan: false,
        pasos: false,
        spol: '',
        starost: '',
        location: '',
        created_at: '',
      },
    }
  }
}
