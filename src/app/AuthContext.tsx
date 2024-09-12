'use client'
import { useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
interface AuthContextType {
  isAuthenticated: boolean
  username: string
  loading: boolean
  email: string
  Login: (formData: FormData) => Promise<{ success: boolean }>
  Logout: () => Promise<void>
}

// default value for context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true) // Start loading

      try {
        const response = await axios.get(`https://www.petconnectbosnia.com/api/checkAuth`, {
          withCredentials: true, // Ensure cookies are sent with the request
        })
        console.log('RESPONSE', response)

        if (response.status === 200) {
          setIsAuthenticated(true)
          setUsername(response.data.username)
          setEmail(response.data.email)
          setLoading(false)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false) // End loading
      }
    }

    checkAuth()
  }, [router])

  const Login = async (formData: FormData): Promise<{ success: boolean }> => {
    console.log('SENT FORM DATA LOGIN', formData)
    setLoading(true) // Start loading

    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

    try {
      const response = await axios.post('https://www.petconnectbosnia.com/api/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })

      if (response.status === 200) {
        setIsAuthenticated(true)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setLoading(false)
        return { success: true }
      } else {
        setIsAuthenticated(false)
        return { success: false }
      }
    } catch (error) {
      console.log('Error during login:', error)
      setIsAuthenticated(false)
      return { success: false }
    } finally {
      setLoading(false) // End loading
    }
  }

  const Logout = async () => {
    setLoading(true) // Start loading

    try {
      // clear cookies on the client side
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'

      await axios.post('https://www.petconnectbosnia.com/api/logout', null, {
        withCredentials: true,
      })
      setIsAuthenticated(false)
      setUsername('')
      setEmail('')
      revalidatePath('/dashboard')
      revalidatePath('/')
    } catch (error) {
      console.error('Error logging out:', error)
    } finally {
      setLoading(false) // End loading
    }
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, Login, Logout, loading, username, email }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function UseAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
