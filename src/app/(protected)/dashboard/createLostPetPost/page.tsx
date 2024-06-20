"use client"
import React, {useState, useEffect} from 'react'
import FormSubmitButton from '../../../globalComponents/FormSubmitButton';
import { createLostPet } from '@public/actions/createLostPetPost';
import Image from 'next/image';

//export const metadata: Metadata = {
//     title: "Kreiraj Donaciju",
//   }; FIX THIS: IT DOESN'T WORK ON CLIENT SIDE, ONLY ON SERVER SIDE

const ImageUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [location, setLocation] = useState<string>("");
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const files = Array.from(event.target.files);
        const totalFiles = selectedFiles.length + files.length;
        setVisible(true);
  
        if (totalFiles > 3) {
          setError('You can only upload up to 3 images.');
          return;
        } else {
          setError(null);
        }
  
        const newFiles = files.slice(0, 3 - selectedFiles.length);
        setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
  
        // Generate preview URLs
        const urls = newFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(prevUrls => [...prevUrls, ...urls]);
      }
    };
  
    // Clean up object URLs to avoid memory leaks
    useEffect(() => {
      return () => {
        previewUrls.forEach(url => URL.revokeObjectURL(url));
      };
    }, [previewUrls]);
  

  const handleRemoveImage = (index: number) => {
    // Remove the file and preview URL at the given index
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedUrls = previewUrls.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedUrls);
  };



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const formData = new FormData(event.target as HTMLFormElement);
        selectedFiles.forEach((file) => formData.append('files', file));
    
        try {
          await createLostPet(formData, location);
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

            <div className='flex flex-col py-3'>

            <input type="file" name="file" accept="image/*" multiple onChange={handleFileChange} />
            {error && <p className="text-red-600">{error}</p>}


            <div className={ visible ? "grid grid-cols-3 gap-5 mt-4 w-full border-dashed border-4 border-gray-400" : "hidden"}>
            {previewUrls.map((url, index) => (
               <div key={index} className="relative m-2">
                  <Image height={200} width={200} key={index} src={url} alt={`Preview ${index}`} className="h-[30vh] w-full object-contain m-2" />
                    <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button>
            </div>
            ))}
          </div>

            <p className='text-xl'>Lokacija</p>
            <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">Click</div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-white">
                <li onClick={()=>setLocation("Tuzla")}><a>Tuzla</a></li>
                <li onClick={()=>setLocation("Sarajevo")}><a>Sarajevo</a></li>
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