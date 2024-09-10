'use server'
import axios from 'axios'

export async function createDonationPost(
  formData: FormData,
  locationPost: string,
  email: string,
  username: string
) {
  const images = formData.getAll('images')
  const animal_category = formData.get('animal_category')?.toString() || ''
  const post_category = formData.get('post_category')?.toString() || ''
  const post_name = formData.get('post_name')?.toString() || ''
  const phonenumber = formData.get('phonenumber')?.toString() || ''
  const description = formData.get('description')?.toString() || ''
  const location = locationPost
  const userEmail = email
  const name = username

  const formDataToSend = new FormData()

  formDataToSend.append('animal_category', animal_category)
  formDataToSend.append('post_category', post_category)
  formDataToSend.append('post_name', post_name)
  formDataToSend.append('phonenumber', phonenumber)
  formDataToSend.append('description', description)
  formDataToSend.append('location', location)
  formDataToSend.append('email', userEmail)
  formDataToSend.append('username', name)

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
      '/api/createDonationPost',
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
