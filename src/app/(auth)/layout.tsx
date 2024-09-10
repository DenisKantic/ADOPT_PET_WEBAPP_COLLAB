import { FC, ReactNode } from 'react'
import { AuthProvider } from '../AuthContext'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <AuthProvider>
        <div className="focus:outline-none">{children}</div>
      </AuthProvider>
    </div>
  )
}

export default AuthLayout
