"use client"
import React, {useState, useEffect} from 'react'
import FormSubmitButton from '../../globalComponents/FormSubmitButton';
import { createLostPost } from '@public/actions/createLostPetPost';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from "react";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'


//export const metadata: Metadata = {
//     title: "Kreiraj Donaciju",
//   }; FIX THIS: IT DOESN'T WORK ON CLIENT SIDE, ONLY ON SERVER SIDE

const ImageUpload = () => {

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [location, setLocation] = useState<string>("Izaberite");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [inputKey, setInputKey] = useState<number>(0); // Add key state to force input re-render
  const [fileName, setFileName] = useState<string | null>(null); // State to store file name
  const router = useRouter(); // Initialize the router
  const [isPending, startTransition] = useTransition(); // loading state
  
  
  
  const cities = [
    "Banja Luka", "Bihać", "Bijeljina", "Bosanska Gradiška", "Bosanska Krupa", 
    "Bosanski Brod", "Bosanski Novi", "Bosanski Petrovac", "Brčko", "Breza", 
    "Bugojno", "Busovača", "Cazin", "Čapljina", "Čelić", "Čelinac", "Čitluk", 
    "Derventa", "Doboj", "Donji Vakuf", "Drvar", "Fojnica", "Gacko", "Glamoč", 
    "Goražde", "Gornji Vakuf-Uskoplje", "Gračanica", "Gradačac", "Hadžići", 
    "Han Pijesak", "Ilidža", "Ilijaš", "Jablanica", "Jajce", "Kakanj", 
    "Kalesija", "Kalinovik", "Kiseljak", "Kladanj", "Ključ", "Konjic", 
    "Kotor Varoš", "Kreševo", "Kupres", "Laktaši", "Lopare", "Ljubinje", 
    "Ljubuški", "Lukavac", "Maglaj", "Milići", "Modriča", "Mostar", "Mrkonjić Grad", 
    "Neum", "Nevesinje", "Novi Travnik", "Odžak", "Orašje", "Pale", "Posušje", 
    "Prijedor", "Prnjavor", "Prozor-Rama", "Rogatica", "Rudo", "Sanski Most", 
    "Sapna", "Sarajevo", "Šamac", "Šekovići", "Šipovo", "Sokolac", "Srebrenica", 
    "Srebrenik", "Široki Brijeg", "Stolac", "Teočak", "Teslić", "Tešanj", 
    "Tomislavgrad", "Travnik", "Trebinje", "Trnovo", "Tuzla", "Ugljevik", 
    "Vareš", "Velika Kladuša", "Visoko", "Vitez", "Višegrad", "Vogošća", 
    "Zavidovići", "Zenica", "Zvornik", "Žepče", "Živinice"
  ];
  
  const dropdownHandle = (location:string) =>{
    setLocation(location);
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

const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
  

      startTransition(async ()=>{
      const response = await createLostPost(formData, location)
    //  // if(response?.success){
    //     router.push('/dashboard')
    //     router.refresh();
    //   }})
    // } catch (err) {
    //   console.error("Failed to create donation post", err);
    // }
  })
}

  return (
    <div className='min-h-screen w-full bg-gray-200 px-10 py-20
                    xxs:px-4 md:px-10'>
       <div className='bg-gray-100 mx-auto min-h-[50vh] shadow-2xl rounded-md
                        xxs:w-full md:w-[60%] xl:w-[60%]'>
            <h1 className='text-2xl text-black text-center py-10 font-bold tracking-wide'>Kreiraj objavu</h1>

            <form onSubmit={handleSubmit} className='flex flex-col items-start w-full text-black p-5'>

            <div className='flex flex-col py-3 w-full'>

            <div className="btn bg-[#2F5382] text-md text-white rounded-xl
                           hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
              <label htmlFor="fileUpload" className="w-full cursor-pointer flex items-center justify-center">
              <p className='w-full text-lg'>{fileName  ? fileName : 'Izaberite fotografiju'}</p>
              </label>
              <input 
                key={inputKey}
                multiple
                type='file'
                id="fileUpload"
                name='images'
                accept='image/*'
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {error && <p className='text-red-600 py-3'>{error}</p>}


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

            <p className='text-xl pt-5'>Lokacija</p>
            <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 px-6 bg-[#2F5382] text-md text-white rounded-xl mt-5" onClick={()=>setDropdown(!dropdown)}>{location}</div>
            <ul 
              tabIndex={0} 
              className={dropdown ? "dropdown-content z-[1] border-[1px] border-[#2F5382] p-2 shadow bg-white rounded-lg w-60 text-white max-h-[50vh] overflow-y-auto" : "hidden"}>
              {cities.map((city, index) => (
                <li className='p-3 cursor-pointer text-md text-black hover:bg-[#2F5382] rounded-xl hover:text-white ' key={index} onClick={() => dropdownHandle(city)}><a>{city}</a></li>
              ))}
            </ul>
          </div>

            <label className="text-lg pt-2" htmlFor='name'>
                Ime 
            </label>
            <input
            className="input input-bordered border-[#2F5382] bg-white rounded-full mt-2 p-5 w-full text-lg
                focus:border-2 focus:border-[#2F5382]"
            name="name"
            type='text'
            placeholder="Npr. Leo, Rex..."
            required
            />     
            </div>


            <div className="flex flex-col items-start">

                <div className='flex flex-col py-2'>
                    <label htmlFor="category" className="py-2">Životinja:</label>
                        <div className="flex items-center py-2">
                            <input type="radio"  name="category" value="mačka" className="radio radio-info border-[#2F5382]" />
                            <label htmlFor="category" className="ml-3">Mačka</label>
                            
                            <input type="radio"  name="category" value="pas" className="radio radio-info ml-5 border-[#2F5382]" />
                            <label htmlFor="category" className="ml-3">Pas</label>

                            <input type="radio" name="category" value="ostalo" className="radio radio-info ml-5 border-[#2F5382]" />
                            <label htmlFor="category" className="ml-3">Ostalo</label>
                    </div>
                </div>

                <div className='flex flex-col py-2'>
                    <label htmlFor="spol" className="py-2">Spol:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="spol" value="musko" className="radio radio-info" />
                            <label htmlFor="spol" className="ml-3">Muško</label>
                            
                            <input type="radio" name="spol" value="zensko" className="radio radio-error ml-5" />
                            <label htmlFor="spol" className="ml-3">Žensko</label>
                    </div>
                </div>
                
            </div>
               
            <br />

            <label className="text-lg" htmlFor='phonenumber'>
                Broj telefona <span className='text-sm text-gray-600'>{"(061 - xxx -...)"}</span>
            </label>
            <input 
            className="input input-bordered border-[#2F5382] bg-white rounded-full mt-2 p-5 w-[50%] xxs:w-full sm:w-[60%] text-lg
             focus:border-2 focus:border-[#2F5382]"
            name="phonenumber"
            type='text'
            placeholder="Upišite broj telefona"
            required
            maxLength={15}
            />
            <br />

            <label className="text-lg" htmlFor='description'>
                Kratak opis
            </label>
            <textarea 
            required 
            name='description'
            maxLength={2000}
            className="textarea border-[#2F5382] resize-none bg-white mt-3 w-full h-[20vh]
                      focus:border-2 focus:border-[#2F5382]" 
            placeholder="Unesite kratak opis"/>
            <br />

            <button disabled={isPending}  
            className="btn px-6 bg-[#2F5382] text-md text-white rounded-full mt-5
            hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382] mx-auto"
            >Kreiraj Oglas
             {isPending && <span className="loading loading-dots loading-lg bg-[#2F5382]"></span>}</button>
            </form>
          </div>
        </div>
  )
}

export default ImageUpload;