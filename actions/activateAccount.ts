'use server'
import axios from 'axios'

export async function ActivateAccount(token: any) {
  try {
    const response = await axios.post(
      'http://localhost:8080/activateAccount',
      null,
      {
        params: { token: token },
      }
    )
    return { success: true }
  } catch (error) {
    console.log('error happened in actios')
  }
}
