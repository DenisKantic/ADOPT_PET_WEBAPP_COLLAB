'use client'
import { useRouter } from "next/navigation"
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode
} from 'react'
import axios from 'axios'

interface AuthContextType{
    isAuthenticated: boolean
    username: string
    loading: boolean
    Login: (formData:FormData) =>Promise<void>
    Logout: ()=> Promise<void>
}

// default value for context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps{
    children: ReactNode
}

export function AuthProvider({children}: AuthProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter();

    useEffect(()=>{
        const checkAuth = async () =>{
            try{
                const response = await axios.get('http://localhost:8080/checkAuth',{
                  withCredentials: true // this ensures cookies are sent with the request
                }
                )
                console.log(response)
                if(response.status === 200){
                    setIsAuthenticated(true)
                    setUsername(response.data.username)
                    console.log("AUTH COMPLETE")
                } else {
                    setIsAuthenticated(false)
                }

            } catch(error){
                console.log("ERROR on middleware", error)
            }   finally{
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    const Login = async (formData: FormData): Promise<void>=>{
        console.log("SENT FORM DATA LOGIN", formData)
        try{
            const response = await axios.post('http://localhost:8080/login',
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            )

            if (response.status === 200){
                setIsAuthenticated(true)
                setUsername(response.data.username)
            } else {
                setIsAuthenticated(false)
            }
        } catch(error:any){
            setIsAuthenticated (false)
            return error.response?.status || 500
        }
    }

    const Logout = async () =>{
        try{
            await axios.post('http://localhost:8080/logout', null,{
                withCredentials: true,
            })
            setIsAuthenticated(false)
            router.push('/')
        } catch(error){
            console.log("error logging out", error)
        }
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, Login, Logout, loading, username}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UseAuth(){
    const context = useContext(AuthContext)
    if (context === undefined){
        throw new Error('useAuth must be used within an authprovider')
    }
    return context;
}