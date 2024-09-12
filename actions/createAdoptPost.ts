'use server'
import axios from 'axios'
import { cookies } from 'next/headers'

export async function createAdoptPost(
  formData: FormData,
  locationPost: string,
  email: string,
  username: string
) {
  const images = formData.getAll('images')
  const category = formData.get('category')?.toString() || ''
  const petname = formData.get('name')?.toString() || ''
  const phonenumber = formData.get('phoneNumber')?.toString() || ''
  const description = formData.get('description')?.toString() || ''
  const vakcinisan = formData.get('vakcinisan') === 'true' || false
  const cipovan = formData.get('cipovan') === 'true' || false
  const pasos = formData.get('pasos')?.toString() || ''
  const spol = formData.get('spol')?.toString() || ''
  const starost = formData.get('starost')?.toString() || ''
  const location = locationPost
  const name = username

  const formDataToSend = new FormData()
  formDataToSend.append('category', category)
  formDataToSend.append('phonenumber', phonenumber)
  formDataToSend.append('petname', petname)
  formDataToSend.append('description', description)
  formDataToSend.append('vakcinisan', vakcinisan.toString())
  formDataToSend.append('cipovan', cipovan.toString())
  formDataToSend.append('pasos', pasos)
  formDataToSend.append('spol', spol)
  formDataToSend.append('starost', starost)
  formDataToSend.append('location', location)
  formDataToSend.append('email', email)
  formDataToSend.append('username', name)

  if (images.length === 0) {
    return {
      success: false,
      message: 'No images provided',
    }
  }

  images.forEach((image) => {
    formDataToSend.append('images', image)
  })

  console.log('FORM TO BE SENT', formDataToSend)

  try {
    const response = await axios.post('https://www.petconnectbosnia.com/api/createAdoptPost', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    console.log(response)
    return { success: true }
  } catch (error: any) {
    alert(error)
    return error.status
  }
}
