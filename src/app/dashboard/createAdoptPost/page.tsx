'use client'
import React, { useState, useEffect } from 'react'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createAdoptPost } from '@public/actions/createAdoptPost'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { AxiosError } from 'axios'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { UseAuth } from '@/app/AuthContext'
import LoadingSpinner from './Spinner'

const CreateAdoptPost = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [location, setLocation] = useState<string>('Izaberite')
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [newError, setNewError] = useState<boolean | null>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [inputKey, setInputKey] = useState<number>(0) // Add key state to force input re-render
  const [fileName, setFileName] = useState<string | null>(null) // State to store file name
  const router = useRouter() // Initialize the router
  const [isPending, startTransition] = useTransition() // loading state
  const { email, username, loading } = UseAuth()

  console.log('EMAIL TEST', email)

  console.log('CREATE POST EMAIL', email.toString())

  // useEffect(() => {
  //   // Retry fetching email if it doesn't exist
  //   if (!loading && !email) {
  //     window.location.reload()
  //   }
  // }, [loading, email])

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

  const dropdownHandle = (location: string) => {
    setLocation(location)
    setDropdown(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
      const totalFiles = selectedFiles.length + files.length
      setVisible(true)

      if (totalFiles > 5) {
        setError('Možete objaviti samo 5 slika.')
        return
      } else {
        setError(null)
      }

      const newFiles = files.slice(0, 5 - selectedFiles.length)
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles])

      // Generate preview URLs
      const urls = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewUrls((prevUrls) => [...prevUrls, ...urls])
    }
  }

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  const handleRemoveImage = () => {
    // Clear the file and preview URL
    setSelectedFiles([])
    setPreviewUrls([])
    setError(null) // Clear any previous error
    setVisible(false)
    setFileName(null) // Clear file name
    setInputKey((prevKey) => prevKey + 1) // Force input re-render by changing key
  }

  if (loading) {
    return <LoadingSpinner />
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const formDataEntries = Array.from(formData.entries())
    console.log('Form Data Entries:', formDataEntries)

    startTransition(async () => {
      try {
        const response = await createAdoptPost(
          formData,
          location,
          email,
          username
        )

        if (response?.success) {
          // Navigate to the dashboard on success
          router.push('/dashboard')
          window.location.reload()
        } else {
          // Handle failure case where success is false
          setNewError(true)
          alert(response?.message || 'Desila se greška.')
        }
      } catch (error: unknown) {
        setNewError(true)

        if (error instanceof AxiosError && error.response) {
          // If the error is from Axios and has a response, display the backend message
          alert(error.response.data.message || 'Desila se greška.')
        } else if (error instanceof Error) {
          // Generic error handling
          alert(error.message || 'Desila se greška.')
        } else {
          // Fallback for unknown errors
          alert('Desila se greška.')
        }
      }
    })
  }
  return (
    <div className="min-h-screen w-full bg-white xxs:px-4 md:px-10 py-5">
      <div
        className="w-[50%] bg-white mx-auto min-h-[50vh] rounded-md
                        xxs:w-full md:w-[60%] xl:w-[50%]"
      >
        <h1 className="text-2xl text-black text-center py-10 font-bold tracking-wide">
          Kreiraj objavu - Udomi ljubimca
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full text-black p-5 xxs:text-sm md:text-lg"
        >
          <div className="flex flex-col py-3 w-full">
            <div
              className="btn border-2 border-dashed h-[20svh] bg-white text-md text-white rounded-xl
                           hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
            >
              <div className='px-20'>
              <p className='text-lg text-black'>Odaberite fotografiju klikom na dugme</p>
             <p className='text-sm text-gray-400 py-2'>Moguce postaviti vise fotografija*</p>
              <label
                htmlFor="fileUpload"
                className="w-full btn bg-[#2F5382] text-white cursor-pointer flex items-center justify-center"
              >

                
                <p className="w-full text-lg">
                  {fileName ? fileName : 'Izaberite fotografiju'}
                </p>
              </label>
              <input
                key={inputKey}
                multiple
                type="file"
                id="fileUpload"
                name="images"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              </div>
            </div>
            {error && <p className="text-red-600 py-3">{error}</p>}

            <div
              className={
                visible
                  ? 'flex max-h-[70vh] gap-5 mt-4 w-full border-dashed border-4 border-gray-400 z-2 overflow-hidden'
                  : 'hidden'
              }
            >
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={0}
                keyboard
                pagination={{ clickable: true }}
                navigation={{}} // Enable navigation
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {/* Generate Carousel Items */}
                {previewUrls.map((url, index) => (
                  <SwiperSlide className="w-full h-[50vh]" key={index}>
                    <Image
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-contain"
                      height={50} // Adjust height as needed
                      width={50} // Adjust width as needed
                    />
                    {/* Optional: Add a remove button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage()} // Pass index to remove specific image
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center
                      hover:bg-red-300 hover:text-black"
                    >
                      <p className="text-2xl w-full font-bold">&times;</p>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <p className='text-2xl font-bold  text-[#506e95] py-5 tracking-tight'>Osnovne informacije</p>
            <label className="text-[0.9em] pt-2" htmlFor="name">
            Ime ljubimca*
          </label>
          <input
            className="input input-bordered border-[#2F5382] bg-white rounded-lg py-6 mt-2 p-5 w-full text-lg
                focus:border-2 focus:border-[#2F5382]"
            maxLength={15}
            name="name"
            type="text"
            placeholder="Upišite ime ljubimca"
          />
          <br />

          <label className="text-[0.9em]" htmlFor="phoneNumber">
            Broj mobitela*
            <span className="text-sm text-gray-600">{'(061 - xxx -...)'}</span>
          </label>
          <input
            className="input input-bordered border-[#2F5382] bg-white rounded-lg mt-2 p-5 w-full text-lg
                focus:border-2 focus:border-[#2F5382]"
            maxLength={15}
            name="phoneNumber"
            type="text"
            placeholder="Upišite broj telefona"
          />
          <br />



            <p className="text-xl">Lokacija</p>
            <div className="dropdown w-full dropdown-bottom">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 px-6 bg-[#2F5382] text-lg text-white rounded-xl mt-5"
                onClick={() => setDropdown(!dropdown)}
              >
                {location}
              </div>
              <ul
                tabIndex={0}
                className={
                  dropdown
                    ? 'dropdown-content z-[1] border-[1px] border-[#2F5382] p-2 shadow bg-white rounded-lg w-60 text-white max-h-[50vh] overflow-y-auto'
                    : 'hidden'
                }
              >
                {cities.map((city, index) => (
                  <li
                    className="p-3 cursor-pointer text-md text-black hover:bg-[#2F5382] rounded-xl hover:text-white "
                    key={index}
                    onClick={() => dropdownHandle(city)}
                  >
                    <a>{city}</a>
                  </li>
                ))}
              </ul>
            </div>

            <label htmlFor="category" className="py-2 font-bold text-[#506e95] tracking-tight">
              Vrsta ljubimca
            </label>
            <div className="grid grid-cols-3 gap-10 py-2 overflow-hidden">
            <label htmlFor="category" className="w-full font-normal text-lg text-ellipsisxt-center  btn bg-white  text-[#506e95] flex items-center justify-center">
              <input
                type="radio"
                name="category"
                value="pas"
                className="hidden"
              />
             
                Pas
              </label>

              <label htmlFor="category" className="w-full font-normal text-lg text-center btn bg-white  text-[#506e95] flex items-center justify-center">

              <input
                type="radio"
                name="category"
                value="macka"
                className="hidden"
              />
                Mačka
              </label>

              <label htmlFor="category" className="text-center font-normal text-lg btn bg-white  text-[#506e95]  flex items-center justify-center">
              <input
                type="radio"
                name="category"
                value="ostalo"
                className="hidden"
              />
                Ostalo
              </label>
            </div>
          </div>

          
          <div className="flex flex-col w-full items-start">
            <div className="flex w-full flex-col py-2">
              <label htmlFor="vakcinisan" className=" text-[#506e95] font-bold tracking-tight text-xl py-2">
                Vakcinisan:
              </label>
              <div className="grid grid-cols-3 gap-10 overflow-hidden py-2">
              <label htmlFor="category" className="w-full font-normal text-lg text-center btn bg-white  text-[#506e95] flex items-center justify-center">

                <input
                  type="radio"
                  name="vakcinisan"
                  value="true"
                  className="hidden"
                />
                  Da
                </label>

                <label htmlFor="category" className="text-lg font-normal text-center btn bg-white  text-[#506e95] flex items-center justify-center">

                <input
                  type="radio"
                  name="vakcinisan"
                  value="false"
                  className="hidden"
                />
                  Ne
                </label>
              </div>
            </div>

            <div className="flex w-full flex-col py-2">
              <label htmlFor="cipovan" className=" text-[#506e95] font-bold tracking-tight text-xl py-2">
                Čipovan:
              </label>
              <div className="grid gap-10 grid-cols-3 py-2">
              <label htmlFor="cipovan" className="w-full font-normal text-lg btn bg-white  text-[#506e95] cursor-pointer flex items-center justify-center"
                >
                <input
                  type="radio"
                  name="cipovan"
                  value="true"
                  className="hidden"
                />
                  Da
                </label>

                <label htmlFor="cipovan" className="w-full font-normal text-lg btn bg-white  text-[#506e95]  cursor-pointer flex items-center justify-center"
                >
                <input
                  type="radio"
                  name="cipovan"
                  value="false"
                  className="hidden"
                />
                  Ne
                </label>
              </div>
            </div>

            <div className="flex w-full flex-col py-2">
              <label htmlFor="pasos" className=" text-[#506e95] font-bold tracking-tight text-xl py-2">
                Pasoš:
              </label>
              <div className="grid grid-cols-3 gap-10 py-2">
              <label htmlFor="pasos" className="w-full font-normal text-lg btn bg-white  text-[#506e95]  cursor-pointer flex items-center justify-center"
                >
                <input
                  type="radio"
                  name="pasos"
                  value="true"
                  className="hidden"
                />
              
                  Da
                </label>

                <label htmlFor="pasos" className="w-full font-normal text-lg btn bg-white  text-[#506e95]  cursor-pointer flex items-center justify-center"
                >
                <input
                  type="radio"
                  name="pasos"
                  value="false"
                  className="hidden"
                />
                
                  Ne
                </label>
              </div>
            </div>

            <div className="flex w-full flex-col py-2">
              <label htmlFor="spol" className=" text-[#506e95] font-bold tracking-tight text-xl py-2">
                Spol:
              </label>
              <div className="grid gap-10 grid-cols-3 gpa-10 py-2">
              <label htmlFor="spol" className="w-full text-lg btn font-normal bg-white  text-[#506e95]  cursor-pointer flex items-center justify-center">

                <input
                  type="radio"
                  name="spol"
                  value="musko"
                  className="hidden"
                />
                  Muško
                </label>

                <label htmlFor="spol"  className="w-full text-lg font-normal btn bg-white  text-[#506e95]  cursor-pointer flex items-center justify-center">

                <input
                  type="radio"
                  name="spol"
                  value="zensko"
                  className="hidden"
                />
                  Žensko
                </label>
              </div>
            </div>

            <div className="flex w-full flex-col py-2">
              <label htmlFor="starost" className=" text-[#506e95] font-bold tracking-tight text-xl py-2">
                Starost:
              </label>
              <div className="grid gap-10 grid-cols-3 py-2">
              <label htmlFor="starost" className="w-full text-lg btn bg-white  text-[#506e95] font-normal  cursor-pointer flex items-center justify-center">

                <input
                  type="radio"
                  name="starost"
                  value="mladje"
                  className="hidden"
                />
                  Mlađe
                </label>

                <label htmlFor="starost" className="w-full font-normal text-lg btn bg-white  text-[#506e95]  cursor-pointer flex items-center justify-center">

                <input
                  type="radio"
                  name="starost"
                  value="odraslo"
                  className="hidden"
                />
                  Odraslo
                </label>

                <label htmlFor="starost" className="w-full font-normal text-lg btn bg-white  text-[#506e95]  cursor-pointer flex items-center justify-center">

                <input
                  type="radio"
                  name="starost"
                  value="starije"
                  className="hidden"
                />
                  Starije
                </label>
              </div>
            </div>
          </div>

          <br />

         
          <label className=" text-[#506e95] font-bold tracking-tight text-xl py-2" htmlFor="description">
            Kratak opis
          </label>
          <textarea
            name="description"
            maxLength={2000}
            className="textarea border-[#2F5382] resize-none bg-white mt-3 w-full h-[20vh] text-lg
                      focus:border-2 focus:border-[#2F5382]"
            placeholder="Unesite kratak opis"
          />
          <br />

          <button
            disabled={isPending}
            className="btn w-full bg-[#2F5382] text-md text-white rounded-lg mt-5 text-lg
            hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382] mx-auto"
          >
            Objavi Oglas
            {isPending && (
              <span className="loading loading-dots loading-lg bg-[#2F5382]"></span>
            )}
          </button>
          {error && <p className="text-red-400 text-xl">Desila se greska</p>}
        </form>
      </div>
    </div>
  )
}

export default CreateAdoptPost
