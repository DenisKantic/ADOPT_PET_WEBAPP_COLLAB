'use client'
import React, { useState, useEffect } from 'react'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createAdoptPost } from '@public/actions/createAdoptPost'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { UseAuth } from '@/app/AuthContext'

const CreateAdoptPost = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [location, setLocation] = useState<string>('Izaberite')
  const [dropdown, setDropdown] = useState<boolean>(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [inputKey, setInputKey] = useState<number>(0) // Add key state to force input re-render
  const [fileName, setFileName] = useState<string | null>(null) // State to store file name
  const router = useRouter() // Initialize the router
  const [isPending, startTransition] = useTransition() // loading state
  const { email } = UseAuth()

  console.log('HERE IS EMAIL', email.toString())

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

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (event.target.files) {
    //   const files = Array.from(event.target.files);

    //   const maxSize = 3 * 1024 * 1024 // converting 3 MB to bytes

    //   // If an image is already selected, set an error and return early
    //   if (files.length + selectedFiles.length>1) {
    //     setError('Možete objaviti samo jednu sliku.');
    //     event.target.value = ""
    //     return;
    //   }

    //   setVisible(true);
    //   setError(null); // Clear any previous error

    //   if(files[0].size > maxSize){
    //     setError("Fotografija ne smije biti vise od 3 MB ukupne memorije.")
    //     setVisible(false);
    //   } else {
    //     const newFile = files[0]; // We only allow one image at a time
    //     const url = URL.createObjectURL(newFile);
    //     setVisible(true)
    //     setSelectedFiles([newFile]); // Replace any existing files
    //     setPreviewUrls([url])
    //     setFileName(newFile.name); // Update file name
    //     setInputKey(prevKey => prevKey + 1)
    //   }

    //  }
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    startTransition(async () => {
      try {
        const response = await createAdoptPost(formData, location, email)
        if (response?.success) {
          router.push('/dashboard')
          router.refresh()
        }
      } catch (error) {
        console.log('error happened', error)
        alert(error)
      }
    })
  }

  return (
    <div className="min-h-screen w-full bg-gray-200 xxs:px-4 md:px-10 py-5">
      <div
        className="w-[50%] bg-gray-100 mx-auto min-h-[50vh] shadow-2xl rounded-md
                        xxs:w-full md:w-[60%] xl:w-[50%]"
      >
        <h1 className="text-2xl text-black text-center py-10 font-bold tracking-wide">
          Kreiraj objavu
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-full text-black p-5 xxs:text-sm md:text-lg"
        >
          <div className="flex flex-col py-3 w-full">
            <div
              className="btn bg-[#2F5382] text-md text-white rounded-xl
                           hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]"
            >
              <label
                htmlFor="fileUpload"
                className="w-full cursor-pointer flex items-center justify-center"
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

            <p className="text-xl pt-5">Lokacija</p>
            <div className="dropdown dropdown-bottom">
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

            <label htmlFor="category" className="py-2">
              Kategorija:
            </label>
            <div className="flex items-center py-2">
              <input
                type="radio"
                name="category"
                value="pas"
                className="radio radio-info"
              />
              <label htmlFor="category" className="ml-3">
                Pas
              </label>

              <input
                type="radio"
                name="category"
                value="macka"
                className="radio radio-info ml-5"
              />
              <label htmlFor="category" className="ml-3">
                Mačka
              </label>

              <input
                type="radio"
                name="category"
                value="ostalo"
                className="radio radio-info ml-5"
              />
              <label htmlFor="category" className="ml-3">
                Ostalo
              </label>
            </div>
          </div>

          <label className="text-lg pt-2" htmlFor="name">
            Ime ljubimca
          </label>
          <input
            className="input input-bordered border-[#2F5382] bg-white rounded-full mt-2 p-5 w-full text-lg
                focus:border-2 focus:border-[#2F5382]"
            maxLength={15}
            name="name"
            type="text"
            placeholder="Upišite ime ljubimca"
            required
          />
          <br />

          <div className="flex flex-col items-start">
            <div className="flex flex-col py-2">
              <label htmlFor="vakcinisan" className="py-2">
                Vakcinisan:
              </label>
              <div className="flex items-center py-2">
                <input
                  type="radio"
                  name="vakcinisan"
                  value="da"
                  className="radio radio-info"
                />
                <label htmlFor="vakcinisan" className="ml-3">
                  Da
                </label>

                <input
                  type="radio"
                  name="vakcinisan"
                  value="ne"
                  className="radio radio-error ml-5"
                />
                <label htmlFor="vakcinisan" className="ml-3">
                  Ne
                </label>
              </div>
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="cipovan" className="py-2">
                Čipovan:
              </label>
              <div className="flex items-center py-2">
                <input
                  type="radio"
                  name="cipovan"
                  value="da"
                  className="radio radio-info"
                />
                <label htmlFor="cipovan" className="ml-3">
                  Da
                </label>

                <input
                  type="radio"
                  name="cipovan"
                  value="ne"
                  className="radio radio-error ml-5"
                />
                <label htmlFor="cipovan" className="ml-3">
                  Ne
                </label>
              </div>
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="pasos" className="py-2">
                Pasoš:
              </label>
              <div className="flex items-center py-2">
                <input
                  type="radio"
                  name="pasos"
                  value="da"
                  className="radio radio-info"
                />
                <label htmlFor="pasos" className="ml-3">
                  Da
                </label>

                <input
                  type="radio"
                  name="pasos"
                  value="ne"
                  className="radio radio-error ml-5"
                />
                <label htmlFor="pasos" className="ml-3">
                  Ne
                </label>
              </div>
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="spol" className="py-2">
                Spol:
              </label>
              <div className="flex items-center py-2">
                <input
                  type="radio"
                  name="spol"
                  value="musko"
                  className="radio radio-info"
                />
                <label htmlFor="spol" className="ml-3">
                  Muško
                </label>

                <input
                  type="radio"
                  name="spol"
                  value="zensko"
                  className="radio radio-error ml-5"
                />
                <label htmlFor="spol" className="ml-3">
                  Žensko
                </label>
              </div>
            </div>

            <div className="flex flex-col py-2">
              <label htmlFor="starost" className="py-2">
                Starost:
              </label>
              <div className="flex items-center py-2">
                <input
                  type="radio"
                  name="starost"
                  value="mladje"
                  className="radio radio-info"
                />
                <label htmlFor="starost" className="ml-3">
                  Mlađe
                </label>

                <input
                  type="radio"
                  name="starost"
                  value="odraslo"
                  className="radio radio-info ml-5"
                />
                <label htmlFor="starost" className="ml-3">
                  Odraslo
                </label>

                <input
                  type="radio"
                  name="starost"
                  value="starije"
                  className="radio radio-info ml-5"
                />
                <label htmlFor="starost" className="ml-3">
                  Starije
                </label>
              </div>
            </div>
          </div>

          <br />

          <label className="text-lg" htmlFor="phoneNumber">
            Broj telefona{' '}
            <span className="text-sm text-gray-600">{'(061 - xxx -...)'}</span>
          </label>
          <input
            className="input input-bordered border-[#2F5382] bg-white rounded-full mt-2 p-5 w-full text-lg
                focus:border-2 focus:border-[#2F5382]"
            maxLength={15}
            name="phoneNumber"
            type="text"
            placeholder="Upišite broj telefona"
            required
          />
          <br />

          <label className="text-lg" htmlFor="description">
            Kratak opis
          </label>
          <textarea
            required
            name="description"
            maxLength={2000}
            className="textarea border-[#2F5382] resize-none bg-white mt-3 w-full h-[20vh] text-lg
                      focus:border-2 focus:border-[#2F5382]"
            placeholder="Unesite kratak opis"
          />
          <br />

          <button
            disabled={isPending}
            className="btn px-6 bg-[#2F5382] text-md text-white rounded-full mt-5 text-lg
            hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382] mx-auto"
          >
            Kreiraj Oglas
            {isPending && (
              <span className="loading loading-dots loading-lg bg-[#2F5382]"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateAdoptPost
