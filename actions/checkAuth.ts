import axios from 'axios'

export async function checkAuth(cookie: any) {
  try {
    const response = await axios.get('https://www.petconnectbosnia.com/api/checkAuth', {
      headers: {
        Cookie: `token=${cookie}`,
      },
      withCredentials: true,
    })
    if (response.status === 200) {
      return {
        isAuthenticated: true,
        username: response.data.username,
      }
    }
  } catch (error) {
    console.error('Authentication check failed', error)
  }
  return {
    isAuthenticated: false,
    username: '',
  }
}
