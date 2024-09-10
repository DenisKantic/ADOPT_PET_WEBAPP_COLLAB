'use server'
import axios from 'axios'

export async function RegisterProfile(formData: any) {
  const username = formData.get('username')?.toString() || ''
  const email = formData.get('email')?.toString() || ''
  const password = formData.get('password')?.toString() || ''

  const formDataAppend = new FormData()

  formDataAppend.append('username', username)
  formDataAppend.append('email', email)
  formDataAppend.append('password', password)

  try {
    const response = await axios.post(
      'http://localhost:8080/register',
      formDataAppend,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return { success: true, data: response.data }
  } catch (error) {
    console.log('ERROR IN ACTION', error)
  }
}
