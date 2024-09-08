'use server'
import axios from 'axios'
import { revalidatePath } from 'next/cache'

export async function DeleteAdoptPost(id: number) {
  try {
    const response = await axios.delete(`/api/deleteAdoptPost?id=${id}`)
    console.log('POST WITH ID', id, 'IS DELETED')
    revalidatePath('/dashboard')
    return { success: true, data: response.data }
  } catch (error) {
    console.log('ERROR DELETING ADOPT POST', error)
  }
}

export async function DeleteLostPetPost(id: number) {
  try {
    const response = await axios.delete(`/api/deleteLostPetPost?id=${id}`)
    console.log('POST WITH ID', id, 'IS DELETED')
    return { success: true }
  } catch (error) {
    console.log('ERROR DELETING ADOPT POST', error)
  }
}

export default async function DeleteDonationPost(id: number) {
  try {
    const response = await axios.delete(`/api/deleteDonationPost?id=${id}`)
    console.log('POST WITH ID', id, 'IS DELETED')
    return { success: true }
  } catch (error) {
    console.log('ERROR DELETING ADOPT POST', error)
  }
}
