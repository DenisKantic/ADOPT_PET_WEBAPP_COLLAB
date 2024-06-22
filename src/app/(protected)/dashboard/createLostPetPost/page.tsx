"use client"
import React, {useState, useEffect} from 'react'
import FormSubmitButton from '../../../globalComponents/FormSubmitButton';
import { createLostPet } from '@public/actions/createLostPetPost';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//export const metadata: Metadata = {
//     title: "Kreiraj Donaciju",
//   }; FIX THIS: IT DOESN'T WORK ON CLIENT SIDE, ONLY ON SERVER SIDE

const ImageUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [location, setLocation] = useState<string>("Izaberite");
    const [dropdown, setDropdown] = useState<boolean>(false);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const [inputKey, setInputKey] = useState<number>(0); // Add key state to force input re-render
    const [fileName, setFileName] = useState<string | null>(null); // State to store file name
    const router = useRouter(); // Initialize the router


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

    
//LOGIC BEFORE FOR GETTING MULTIPLE IMAGES AND DISPLAYING IT
  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files) {
  //       const files = Array.from(event.target.files);
  //       const totalFiles = selectedFiles.length + files.length;
  //       setVisible(true);
  
  //       if (totalFiles > 1) {
  //         setError('Možete objaviti samo jednu sliku.');
  //         return;
  //       } else {
  //         setError(null);
  //       }
  
  //       const newFiles = files.slice(0, 3 - selectedFiles.length);
  //       setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
  
  //       // Generate preview URLs
  //       const urls = newFiles.map(file => URL.createObjectURL(file));
  //       setPreviewUrls(prevUrls => [...prevUrls, ...urls]);
  //     }
  //   };
  
  //   // Clean up object URLs to avoid memory leaks
  //   useEffect(() => {
  //     return () => {
  //       previewUrls.forEach(url => URL.revokeObjectURL(url));
  //     };
  //   }, [previewUrls]);
  

  // const handleRemoveImage = (index: number) => {
  //   // Remove the file and preview URL at the given index
  //   const updatedFiles = selectedFiles.filter((_, i) => i !== index);
  //   const updatedUrls = previewUrls.filter((_, i) => i !== index);

  //   setSelectedFiles(updatedFiles);
  //   setPreviewUrls(updatedUrls);
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      const maxSize = 3 * 1024 * 1024 // converting 3 MB to bytes

     
      // If an image is already selected, set an error and return early
      if (files.length + selectedFiles.length>1) {
        setError('Možete objaviti samo jednu sliku.');
        event.target.value = ""
        return;
      }

      setVisible(true);
      setError(null); // Clear any previous error

      
      if(files[0].size > maxSize){
        setError("Fotografija ne smije biti vise od 3 MB ukupne memorije.")
        setVisible(false);
      } else {
        const newFile = files[0]; // We only allow one image at a time
        const url = URL.createObjectURL(newFile);
        setVisible(true)
        setSelectedFiles([newFile]); // Replace any existing files
        setPreviewUrls([url])
        setFileName(newFile.name); // Update file name
        setInputKey(prevKey => prevKey + 1)
      }
     
    }
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleRemoveImage = () => {
    // Clear the file and preview URL
    setSelectedFiles([]);
    setPreviewUrls([]);
    setError(null); // Clear any previous error
    setVisible(false);
    setFileName(null); // Clear file name
    setInputKey(prevKey => prevKey + 1); // Force input re-render by changing key
  };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const formData = new FormData(event.target as HTMLFormElement);
        selectedFiles.forEach((file) => formData.append('files', file));
    
        try {
          const response = await createLostPet(formData, location)
          if(response?.success){
            router.push('/dashboard')
          }
        } catch (err) {
          console.error("Failed to create donation post", err);
        }
      };

  return (
    <div className='min-h-screen w-full bg-gray-200 px-10 py-20'>
       <div className='bg-gray-100 mx-auto min-h-[50vh] shadow-2xl rounded-md
                        xxs:w-full md:w-[60%] xl:w-[60%]'>
            <h1 className='text-2xl text-black text-center py-10 font-bold tracking-wide'>Kreiraj objavu</h1>

            <form onSubmit={handleSubmit} className='flex flex-col items-start w-full text-black p-5'>

            <div className='flex flex-col py-3 w-full'>

            <div className="btn bg-[#2F5382] text-md text-white rounded-xl
                           hover:bg-white hover:border-[#2F5382] hover:text-[#2F5382]">
              <label htmlFor="fileUpload" className="w-full cursor-pointer">
              <p className='py-3'>{fileName  ? fileName : 'Izaberite fotografiju'}</p>
              </label>
              <input
                key={inputKey}
                type='file'
                id="fileUpload"
                name='files'
                accept='image/*'
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {error && <p className='text-red-600 py-3'>{error}</p>}


            <div className={ visible ? "flex gap-5 mt-4 w-full border-dashed border-4 border-gray-400" : "hidden"}>
            {previewUrls.map((url, index) => (
               <div key={index} className="relative m-2 w-full">
                  <Image height={200} width={200} key={index} src={url} alt={`Preview ${index}`} className="h-[50vh] w-full object-contain m-2" />
                    <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 bg-red-400 right-0 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <p className='text-2xl font-bold'>&times;</p>
                  </button>
            </div>
            ))}
          </div>

            <p className='text-xl pt-5'>Lokacija</p>
            <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1 px-6 bg-[#2F5382] text-md text-white rounded-xl mt-5" onClick={()=>setDropdown(!dropdown)}>{location}</div>
            <ul 
              tabIndex={0} 
              className={dropdown ? "dropdown-content z-[1] p-2 shadow bg-[#2F5382] rounded-box w-60 text-white max-h-[50vh] overflow-y-auto" : "hidden"}>
              {cities.map((city, index) => (
                <li className='p-3 cursor-pointer hover:bg-gray-200 rounded-xl hover:text-black ' key={index} onClick={() => dropdownHandle(city)}><a>{city}</a></li>
              ))}
            </ul>
          </div>

            <label className="text-lg pt-2" htmlFor='name'>
                Ime 
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 w-full text-lg"
            name="name"
            type='text'
            placeholder="Npr. Leo, Rex..."
            required
            />     
            </div>


            <div className="flex flex-col items-start">

                <div className='flex flex-col py-2'>
                    <label htmlFor="animalCategory" className="py-2">Životinja:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="animalCategory" value="mačka" className="radio radio-info" />
                            <label htmlFor="animalCategory" className="ml-3">Mačka</label>
                            
                            <input type="radio" name="animalCategory" value="pas" className="radio radio-info ml-5" />
                            <label htmlFor="animalCategory" className="ml-3">Pas</label>

                            <input type="radio" name="animalCategory" value="ostalo" className="radio radio-info ml-5" />
                            <label htmlFor="animalCategory" className="ml-3">Ostalo</label>
                    </div>
                </div>
                
            </div>
               
            <br />

            <label className="text-lg" htmlFor='phoneNumber'>
                Broj telefona <span className='text-sm text-gray-600'>{"(061 - xxx -...)"}</span>
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 w-[50%] xxs:w-full sm:w-[60%] text-lg"
            name="phoneNumber"
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
            className="textarea bg-white textarea-info mt-3 w-full h-[20vh]" 
            placeholder="Unesite kratak opis"/>
            <br />

            <FormSubmitButton className='mx-auto'>Kreiraj Oglas</FormSubmitButton>
            </form>
          </div>
        </div>
  )
}

export default ImageUpload;