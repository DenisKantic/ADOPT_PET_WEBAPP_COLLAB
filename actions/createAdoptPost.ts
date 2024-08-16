"use server"
import axios from 'axios'

export async function createAdoptPost(formData:FormData, locationPost:string){

    const images = formData.getAll('images');
    const category = formData.get("category")?.toString() || ""
    const petname = formData.get("name")?.toString() || ""
    const phonenumber = formData.get("phoneNumber")?.toString() || ""
    const description = formData.get("description")?.toString() || ""
    const vakcinisan = formData.get("vakcinisan") === "true" || false
    const cipovan = formData.get("cipovan")  === "true" || false
    const pasos = formData.get("pasos")?.toString() || ""
    const spol = formData.get("spol")?.toString() || ""
    const starost = formData.get("starost")?.toString() || ""
    const location = locationPost;

    const formDataToSend = new FormData();
    formDataToSend.append('category', category)
    formDataToSend.append('phonenumber',phonenumber)
    formDataToSend.append('petname', petname)
    formDataToSend.append('description', description)
    formDataToSend.append('vakcinisan', vakcinisan.toString())
    formDataToSend.append('cipovan', cipovan.toString())
    formDataToSend.append('pasos', pasos)
    formDataToSend.append('spol', spol)
    formDataToSend.append('starost', starost)
    formDataToSend.append('location', location)

   if(images.length === 0){
    return {
      success: false
    }
  }

  images.forEach((image)=>{
    if(images.length ==0){
      return {
        success: false
      }
    }else {
        formDataToSend.append('images', image)
      }
  })

  console.log("FORM TO BE SENT", formDataToSend)

  try{
    const response = await axios.post('http://localhost:8080/createAdoptPost',
      formDataToSend,
      {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  )
    console.log(response)
    return response.status
  } catch(error:any){
    console.log("error happened", error)
    return error.status
  }
}