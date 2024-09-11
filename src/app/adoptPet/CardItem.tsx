'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosMale } from 'react-icons/io'
import { IoMaleFemale } from 'react-icons/io5'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlinePets } from 'react-icons/md'
import { PiDogBold } from 'react-icons/pi'
import { FaCat } from 'react-icons/fa'
import { SiAnimalplanet } from 'react-icons/si'
import { getAdoptPost } from '@public/actions/getAdoptPost'
import Pagination from './Pagination'
import LoadingSpinner from './Spinner'

interface AdoptPost {
  id: number
  image_paths: string[]
  category: string
  petname: string
  phonenumber: string
  description: string
  vakcinisan: boolean
  cipovan: boolean
  pasos: boolean
  spol: string
  starost: string
  location: string
  slug: string
  created_at: string
}

export default function CardItem() {
  const PAGE_SIZE = 20
  const [post, setPost] = useState<AdoptPost[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true) // Add loading state
  const [error, setError] = useState<string | null>(null) // Add error state

  const [page, setPage] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState('') // Added location state
  const [locationFilter, setLocationFilter] = useState('') // Added separate state for filter

  const cities = [
    'Banja Luka',
    'Bihać',
    'Bijeljina',
    'Bosanska Gradiška',
    'Bosanska Krupa',
    'Bosanski Brod',
    'Bosanski Novi',
    'Bosanski Petrovac',
    'Brčko',
    'Breza',
    'Bugojno',
    'Busovača',
    'Cazin',
    'Čapljina',
    'Čelić',
    'Čelinac',
    'Čitluk',
    'Derventa',
    'Doboj',
    'Donji Vakuf',
    'Drvar',
    'Fojnica',
    'Gacko',
    'Glamoč',
    'Goražde',
    'Gornji Vakuf-Uskoplje',
    'Gračanica',
    'Gradačac',
    'Hadžići',
    'Han Pijesak',
    'Ilidža',
    'Ilijaš',
    'Jablanica',
    'Jajce',
    'Kakanj',
    'Kalesija',
    'Kalinovik',
    'Kiseljak',
    'Kladanj',
    'Ključ',
    'Konjic',
    'Kotor Varoš',
    'Kreševo',
    'Kupres',
    'Laktaši',
    'Lopare',
    'Ljubinje',
    'Ljubuški',
    'Lukavac',
    'Maglaj',
    'Milići',
    'Modriča',
    'Mostar',
    'Mrkonjić Grad',
    'Neum',
    'Nevesinje',
    'Novi Travnik',
    'Odžak',
    'Orašje',
    'Pale',
    'Posušje',
    'Prijedor',
    'Prnjavor',
    'Prozor-Rama',
    'Rogatica',
    'Rudo',
    'Sanski Most',
    'Sapna',
    'Sarajevo',
    'Šamac',
    'Šekovići',
    'Šipovo',
    'Sokolac',
    'Srebrenica',
    'Srebrenik',
    'Široki Brijeg',
    'Stolac',
    'Teočak',
    'Teslić',
    'Tešanj',
    'Tomislavgrad',
    'Travnik',
    'Trebinje',
    'Trnovo',
    'Tuzla',
    'Ugljevik',
    'Vareš',
    'Velika Kladuša',
    'Visoko',
    'Vitez',
    'Višegrad',
    'Vogošća',
    'Zavidovići',
    'Zenica',
    'Zvornik',
    'Žepče',
    'Živinice',
  ]

  useEffect(() => {
    fetchPost(page, locationFilter)
  }, [page, locationFilter]) // Add page as a dependency

  const fetchPost = async (page: number, location: string) => {
    setIsLoading(true) // Set loading to true when fetching starts
    setError(null) // Reset error state
    try {
      const response = await getAdoptPost(page, PAGE_SIZE, location)

      // check if adopt_post exists and is an array
      if (
        response &&
        response.adopt_post &&
        Array.isArray(response.adopt_post)
      ) {
        const processedPost: AdoptPost[] = response.adopt_post.map(
          (postItem) => {
            const imagePaths =
              typeof postItem.image_paths === 'string'
                ? (postItem.image_paths as string)
                    .replace(/{|}/g, '') // Remove curly braces
                    .split(',') // Split by comma
                    .map((path: string) => path.trim()) // Trim whitespace
                : postItem.image_paths
            return {
              ...postItem,
              image_paths: imagePaths,
            }
          }
        )
        setPost(processedPost)
        console.log('EVO GA', response.totalPages)
        setTotalPages(response.totalPages || 1)
      } else {
        // Handle case when adopt_post is null or not an array
        setPost([]) // Set post as an empty array if no valid data is returned
        setTotalPages(1) // Default to 1 page if the totalPages is not provided
      }
    } catch (err) {
      setError('An error occurred while fetching the data')

      console.log('error happened', err)
    } finally {
      setIsLoading(false) // Set loading to false when fetching is complete
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  // Handle the filter button click
  const applyFilter = () => {
    setLocationFilter(selectedLocation) // Update the location filter to trigger refetch
  }

  return (
    <>
      <div className="filter-container bg-gray-200 border-y-2 border-[#2F5382] w-full fixed top-0 mt-[7svh] py-1 z-10 left-0">
        <div className="flex flex-row items-center w-full gap-5 xxs:gap-0 xxs:justify-between xxs:px-4 md:px-16 md:justify-center md:gap-10">
          <label htmlFor="location">Grad:</label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)} // Update the selected location
            className="btn outline-none px-2 bg-[#2F5382] text-lg text-white rounded-xl"
          >
            <option value="">Sve lokacije</option>

            {cities.map((city, index) => (
              <option
                className="p-3 cursor-pointer text-left text-md text-black hover:bg-[#2F5382] rounded-xl hover:text-white "
                value={`${city}`}
                key={index}
              >
                {city}
              </option>
            ))}
          </select>
          <button
            className="btn bg-[#2F5382] text-white rounded-2xl outline-none hover:text-black"
            onClick={applyFilter}
          >
            Pretraži
          </button>
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{error}</p>
      ) : post.length === 0 ? (
        <p>Podaci nisu pronađeni sa traženim filterima.</p>
      ) : (
        post.map((item) => {
          return (
            <div
              className="relative rounded-xl my-5 w-full pb-2 shadow-2xl overflow-hidden group"
              key={item.id}
            >
              <Link href={`/adoptPet/${item.slug}`} className="">
                <Image
                  src={`https://www.petconnectbosnia.com/api/${item.image_paths[0]}`}
                  alt={item.petname}
                  height={50}
                  width={50}
                  unoptimized
                  className="object-cover rounded-t-2xl xxs:h-[20vh] shadow-lg w-full"
                />
                <div className="w-full px-5">
                  <ul className="text-black mt-2 flex flex-col">
                    <li className="flex items-center">
                      <MdOutlinePets className="text-[#2F5382] text-lg" />
                      <span className="pl-3">
                        {item.petname.substring(0, 20)}
                      </span>
                    </li>
                    <li className="flex items-center">
                      {item.category == 'pas' ? (
                        <PiDogBold className="text-[#2F5382] text-lg" />
                      ) : item.category == 'macka' ? (
                        <FaCat className="text-[#2F5382] text-lg" />
                      ) : (
                        <SiAnimalplanet className="text-[#2F5382] text-xl" />
                      )}
                      <span className="pl-3">{item.category}</span>
                    </li>
                    <li className="flex items-center">
                      {item.spol == 'musko' ? (
                        <IoIosMale className="text-[#2F5382] text-lg" />
                      ) : (
                        <IoMaleFemale className="text-red-600 text-xl" />
                      )}
                      <span className="pl-3">{item.spol}</span>
                    </li>
                    <li className="flex items-center">
                      <IoLocationOutline className="text-[#2F5382] text-lg" />
                      <span className="pl-3">{item.location}</span>
                    </li>
                  </ul>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="btn border-[#2F5382] bg-[#2F5382] text-lg text-white hover:bg-white hover:text-[#2F5382]">
                    Pročitaj više...
                  </p>
                </div>
              </Link>
            </div>
          )
        })
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}
