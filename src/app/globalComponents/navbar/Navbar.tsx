'use server'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import userImage from '@public/public/images/user.png'
import axios from 'axios'
import { cookies } from 'next/headers'
import Logout from './Logout'
import { revalidatePath } from 'next/cache'
import { IoIosDocument } from 'react-icons/io'
import { IoMdSettings } from 'react-icons/io'

export default async function Navbar() {
  const cookie = cookies().get('token')?.value

  let isAuthenticated = false
  let username = ''

  try {
    const response = await axios.get('http://localhost:8080/checkAuth', {
      headers: {
        Cookie: `token=${cookie}`, // Include the cookie in the request headers
      },
      withCredentials: true, // Ensure cookies are sent with the request
    })
    console.log('RESPONSE', response)

    if (response.status === 200) {
      isAuthenticated = true
      username = response.data.username
      revalidatePath('/dashboard')
    }
  } catch (error) {
    console.log('SHIT HAPPENS')
  }
  // const { isAuthenticated, Logout, username, loading } = UseAuth()

  // const router = useRouter()

  // useEffect(() => {
  //   if (!isAuthenticated && !loading) {
  //     return // Redirect to login if not authenticated and loading is complete
  //   }
  // }, [isAuthenticated, loading, router])

  // if (loading) return <LoadingSpinner /> // Show a loading spinner while authentication is being checked

  return (
    <div className="navbar h-[7svh] bg-[#F0F0F0] xxs:px-2 md:px-14 py-1 fixed z-10 shadow-lg">
      <div className="flex-1 xxs:justify-between md:justify-start">
        <Link href="/" className="xxs:hidden md:flex cursor-pointer">
          <Image src="/images/logo.png" alt="logo" height={40} width={40} />
        </Link>

        <div className="ml-5 text-black">
          <Link href="/" className="border-b-2 border-[#2f5382] text-[#2f5382]">
            Početna
          </Link>
          <Link href="/aboutUs" className="ml-5">
            O nama
          </Link>
          <Link href="/help" className="ml-5">
            Pomoć i podrška
          </Link>
          <Link href="/policy" className="ml-5">
            Politika privatnosti
          </Link>
          <Link href="/vetStations" className="ml-5">
            Blog
          </Link>
          <Link href="/vetStations" className="ml-5">
            Kontakt
          </Link>
        </div>
      </div>
      <div className="flex-none gap-2">
        <Link
          href="/login"
          className={
            isAuthenticated
              ? 'hidden'
              : 'flex btn bg-[#2F5382] rounded-full text-white px-6 hover:bg-white hover:text-[#2F5382]'
          }
        >
          Prijavi se
        </Link>
        <div className={isAuthenticated ? 'dropdown dropdown-end' : 'hidden'}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar flex flex-col"
          >
            <div className="w-10 rounded-full">
              <Image
                src={userImage}
                alt="logo"
                height={50}
                width={50}
                priority
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-4 shadow menu menu-sm border-[1px] border-[#2f5382] dropdown-content bg-white rounded-box w-[250px]"
          >
            <li>
              <Link
                href="/dashboard"
                className="badge rounded-xl border-none bg-[#F0F0F0] text-black text-start flex flex-row justify-between my-2 py-5 px-4 text-md w-full"
              >
                <IoIosDocument size={20} className="text-[#2f5382]" />
                <span>Moji oglasi</span>
                <span className="block py-1 px-3 badge-neutral rounded-full text-center bg-[#2f5382] text-white">
                  {username?.substring(0, 10) + '...'}
                </span>
              </Link>
            </li>
            <li className={isAuthenticated ? 'block' : 'hidden'}>
              <Link
                className="my-2 badge rounded-xl border-none bg-[#F0F0F0] text-black text-start 
          flex justify-start py-5 px-4 text-md w-full"
                href="/dashboard/profile-settings"
              >
                <IoMdSettings size={20} className="text-[#2f5382]" />
                Postavke
              </Link>
            </li>
            <li className={isAuthenticated ? 'block' : 'hidden'}>
              <Link
                href="/dashboard"
                className="mt-3 py-1 btn text-[#2f5382] w-full rounded-full bg-white hover:text-white hover:bg-[#2f5382]"
              >
                Objavi oglas
              </Link>
            </li>
            <Logout />
          </ul>
        </div>
      </div>
    </div>
  )
}

{
  /* <div className={ nav ? 'bg-black/80 w-full fixed h-screen z-10 top-0 left-0 duration-200' : 'fixed'}>
<div className={nav ? 'bg-white w-[280px] fixed top-0 left-0 z-10 h-screen duration-200' : 'fixed left-[-100%] w-[-300px] top-0 duration-300'}>
<AiOutlineClose className='absolute top-4 right-4 cursor-pointer' 
            onClick={()=> setNav(!nav)}  size={30}></AiOutlineClose> 
            <h1 className='text-xl text-[#354a67] p-4'>Reset Inžinjering</h1>


            <ul className='flex flex-col items-start p-4 text-black text-lg mt-[50px]'>
    <li className='mr-2 flex items-center py-2'><AiOutlineHome size={22} className='mr-5'/><a href="#home" onClick={()=> setNav(!nav)}>POČETNA</a></li>
    <li className='mr-2 flex items-center py-2'><AiOutlineInfoCircle size={22} className='mr-5' /><a href="#aboutUs" onClick={()=> setNav(!nav)}>O NAMA</a></li>
    <li className='mr-2 flex items-center py-2'><AiOutlineShoppingCart size={22} className='mr-5' /><a href="#products" onClick={()=> setNav(!nav)}>PROIZVODI</a></li>
    <li className='mr-2 flex items-center py-2'><AiOutlinePhone  size={22} className='mr-5'/><a href="#contact" onClick={()=> setNav(!nav)}>KONTAKT</a></li>
   </ul>


</div>
</div> */
}
