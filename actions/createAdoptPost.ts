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
  const pasos = formData.get('pasos') === 'true' || false
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
  formDataToSend.append('pasos', pasos.toString())
  formDataToSend.append('spol', spol)
  formDataToSend.append('starost', starost)
  formDataToSend.append('location', location)
  formDataToSend.append('email', email)
  formDataToSend.append('username', name)

  console.log('VAKCINISAN', vakcinisan, 'CIPOVAN', cipovan, 'PASOS', pasos)

  if (images.length === 0) {
    return {
      success: false,
      message: 'No images provided',
    }
  }

  if (location === 'Izaberite') {
    return {
      success: false,
      message: 'Niste izabrali grad',
    }
  }

  images.forEach((image) => {
    formDataToSend.append('images', image)
  })

  // console.log('FORM TO BE SENT', formDataToSend)

  try {
    const response = await axios.post('https://www.petconnectbosnia.com/api/createAdoptPost', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return { success: true, message: 'Objava je uspješno kreirana' }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data // This will contain the message from the backend
      return {
        success: false,
        message: errorMessage,
      }
    }

    // Generic error handling for other statuses
    return {
      success: false,
      message: 'Desila se greška prilikom kreiranja objave',
    }
  }
}
