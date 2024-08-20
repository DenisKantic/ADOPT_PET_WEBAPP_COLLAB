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

interface AuthContextType {
    isAuthenticated: boolean
    username: string
    loading: boolean
    email: string
    Login: (formData: FormData) => Promise<void>
    Logout: () => Promise<void>
}

// default value for context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true); // Start loading

            try {
                const response = await axios.get('http://localhost:8080/checkAuth', {
                    withCredentials: true // Ensure cookies are sent with the request
                });
                console.log("RESPONSE", response)

                if (response.status === 200) {
                    setIsAuthenticated(true);
                    setUsername(response.data.username);
                    setEmail(response.data.email)
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // End loading
            }
        }

        checkAuth();
    }, [router]);

    const Login = async (formData: FormData): Promise<void> => {
        console.log("SENT FORM DATA LOGIN", formData);
        setLoading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:8080/login',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                setIsAuthenticated(true);
                setUsername(response.data.username);
                setEmail(response.data.email)
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Error during login:", error);
            setIsAuthenticated(false);
        } finally {
            setLoading(false); // End loading
        }
    }

    const Logout = async () => {
        setLoading(true); // Start loading

        try {
            await axios.post('http://localhost:8080/logout', null, {
                withCredentials: true,
            });
            setIsAuthenticated(false);
            setUsername("");
            setEmail("")
            router.push('/');
        } catch (error) {
            console.error("Error logging out:", error);
        } finally {
            setLoading(false); // End loading
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, Login, Logout, loading, username, email }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UseAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
