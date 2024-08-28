import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './globalComponents/navbar/Navbar'
import { AuthProvider } from './AuthContext'
import SecondNavigation from './globalComponents/navbar/SecondNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetConnect Bosna',
  description:
    'Dobrodošli na prvu web aplikaciju za udomljavanje i pomoć svim životinjama na području čitave Bosne i Hercegovine',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div className="pt-[calc(7svh)]">
            <SecondNavigation />{' '}
            {/* Adjust padding-top to account for both navbars */}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
