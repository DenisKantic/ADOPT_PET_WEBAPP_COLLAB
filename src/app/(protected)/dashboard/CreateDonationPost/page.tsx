"use client"
import React, {useState} from 'react'
import FormSubmitButton from '../../../globalComponents/FormSubmitButton';
import { createDonationPost } from '@public/actions/createDonationPost';

//export const metadata: Metadata = {
//     title: "Kreiraj Donaciju",
//   }; FIX THIS: IT DOESN'T WORK ON CLIENT SIDE, ONLY ON SERVER SIDE

const ImageUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
          setSelectedFiles(Array.from(event.target.files));
          console.log(selectedFiles);
        }
      };
    
    //   const handleUpload = async () => {
    //     if (!selectedFiles.length) return;

    //     const formData = new FormData();
    //     selectedFiles.forEach(file => formData.append('file', file));

    //     await createDonationPost(formData, selectedFiles)
    
    //     setUploading(true);
    //     setError(null);
    
    
    
    //       const response = await fetch('/api/s3-upload', {
    //         method: 'POST',
    //         body: formData,
    //       });
    
    //       if (!response.ok) {
    //         const errorText = await response.text();
    //         console.error('Error response from server:', errorText);
    //         throw new Error('Failed to upload files');
    //       }
    
    //       const data = await response.json();
    //       if (data && data.success) {
    //         setUploadedUrls(data.urls);
    //       } else {
    //         setError('Upload failed');
    //       }
    //     } catch (err) {
    //       setError('Upload failed');
    //       console.error('Upload failed:', err);
    //     } finally {
    //       setUploading(false);
    //     } 
    //   };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setUploading(true);
    
        const formData = new FormData(event.target as HTMLFormElement);
        selectedFiles.forEach((file) => formData.append('files', file));
    
        try {
          await createDonationPost(formData);
        } catch (err) {
          console.error("Failed to create donation post", err);
          setError("Failed to create donation post");
        } finally {
          setUploading(false);
        }
      };

  return (
    <div className='min-h-screen w-full bg-gray-200 px-10 py-20'>
       <div className='w-[50%] bg-gray-100 mx-auto min-h-[50vh] shadow-2xl rounded-md
                        xxs:w-full md:w-[60%] xl:w-[50%]'>
            <h1 className='text-2xl text-black text-center py-10 font-bold tracking-wide'>Kreiraj objavu</h1>

            <form onSubmit={handleSubmit} className='flex flex-col items-start w-full text-black p-5'>

            <div className='flex flex-col py-3'>

            <input type="file" name="file" accept="image/*" multiple onChange={handleFileChange} />

            <label htmlFor="category" className="py-2">Kategorija:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="category" value="lijekovi" className="radio radio-info" />
                            <label htmlFor="category" className="ml-3">Lijekovi</label>
                            
                            <input type="radio" name="category" value="hrana" className="radio radio-info ml-5" />
                            <label htmlFor="category" className="ml-3">Hrana</label>

                            <input type="radio" name="category" value="oprema" className="radio radio-info ml-5" />
                            <label htmlFor="category" className="ml-3">Oprema</label>
                    </div>

            <label className="text-lg pt-2" htmlFor='name'>
                Ime 
            </label>
            <input
            className="input input-bordered input-primary bg-white rounded-full mt-2 p-5 w-full text-lg"
            name="name"
            type='text'
            placeholder="Npr. vakcina, uzica itd.."
            required
            />     
            </div>


            <div className="flex flex-col items-start">

                <div className='flex flex-col py-2'>
                    <label htmlFor="animalCategory" className="py-2">Za:</label>
                        <div className="flex items-center py-2">
                            <input type="radio" name="animalCategory" value="mačka" className="radio radio-info" />
                            <label htmlFor="animalCategory" className="ml-3">Mačku</label>
                            
                            <input type="radio" name="animalCategory" value="pas" className="radio radio-info ml-5" />
                            <label htmlFor="animalCategory" className="ml-3">Psa</label>

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