'use server'
import axios from 'axios'

export async function createLostPost(
  formData: FormData,
  locationPost: string,
  email: string
) {
  const images = formData.getAll('images')
  const category = formData.get('category')?.toString() || ''
  const petname = formData.get('name')?.toString() || ''
  const phonenumber = formData.get('phonenumber')?.toString() || ''
  const description = formData.get('description')?.toString() || ''
  const spol = formData.get('spol')?.toString() || ''
  const location = locationPost
  const userEmail = email

  const formDataToSend = new FormData()
  formDataToSend.append('category', category)
  formDataToSend.append('phonenumber', phonenumber)
  formDataToSend.append('petname', petname)
  formDataToSend.append('description', description)
  formDataToSend.append('spol', spol)
  formDataToSend.append('location', location)
  formDataToSend.append('email', userEmail)

  images.forEach((image) => {
    if (images.length == 0) {
      return {
        success: false,
      }
    } else {
      formDataToSend.append('images', image)
    }
  })

  console.log('FORM TO BE SENT', formDataToSend)

  try {
    const response = await axios.post(
      'http://localhost:8080/createLostPost',
      formDataToSend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    console.log(response.data)
    return { success: true }
  } catch (error: any) {
    console.log('error happened', error)
    return error.status
  }
}
