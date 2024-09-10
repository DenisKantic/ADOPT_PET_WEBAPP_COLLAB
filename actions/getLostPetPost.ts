'use server'
import axios from 'axios'

interface AdoptPost {
  id: number
  image_paths: string[]
  category: string
  petname: string
  phonenumber: string
  description: string
  spol: string
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
  spol: string
  location: string
  created_at: string
}

type Email = {
  email: Object
}

export async function getLostPetPost() {
  let response

  try {
    response = await axios.get<{ lost_post: AdoptPost[] }>(
      'http://localhost:8080/getLostPetPostHome'
    )
    return response.data
  } catch (err) {
    console.log('error happened on server side', err)
    return { lost_post: [] }
  }
}

export async function getLostPetPostDashboard({ email }: Email) {
  let response
  let sendEmail = email.toString()

  try {
    response = await axios.get<{ lost_post: AdoptPost[] }>(
      'http://localhost:8080/getLostPetPostDashboard',
      {
        params: { email: sendEmail },
      }
    )
    return response.data
  } catch (err) {
    console.log('error happened on server side', err)
    return { lost_post: [] }
  }
}

export async function getOneLostPetPost(slug: string) {
  let response

  try {
    response = await axios.get<{ lost_post: OneAdoptPost }>(
      `http://localhost:8080/getOneLostPetPost?slug=${slug}`
    )
    return response.data
  } catch (err) {
    console.log('Error happened on server side', err)
    return {
      lost_post: {
        id: 0,
        image_paths: [],
        category: '',
        petname: '',
        phonenumber: '',
        description: '',
        spol: '',
        location: '',
        created_at: '',
      },
    }
  }
}
