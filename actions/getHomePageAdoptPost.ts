'use server'
import axios from 'axios'
import { AdoptPost } from '@public/interface/types'

export async function getHomeAdoptPost() {
  let response

  try {
    response = await axios.get<{ adopt_post: AdoptPost[] }>(
<<<<<<< HEAD
      '/api/getAdoptPostHome'
=======
      'http://localhost:8080/getFiveAdoptPost'
>>>>>>> 76b10501691ac4324151f5ab9580326606b9a68e
    )
    // console.log("REsponse from server", response.data.adopt_post )
    // return response as {data: {adopt_post: AdoptPost[]}}
  } catch (err) {
    console.log('error happened on server side', err)
    return { adopt_post: [] }
  }

  return response.data
}
