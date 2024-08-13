"use server"
import axios from 'axios'; 

interface AdoptPost{
    id: number,
    image_paths: string[],
    category: string,
    petname: string,
    phoneNumber: string,
    description: string,
    vakcinisan: boolean,
    cipovan: boolean,
    pasos: boolean,
    spol: string,
    starost: string,
    location: string,
    slug: string,
    created_at: string;
}

export async function getAdoptPost(){

    let response;

    try{
    response = await axios.get<{adopt_post: AdoptPost[]}>('http://localhost:8080/getAdoptPostHome');
    // console.log("REsponse from server", response.data.adopt_post )
    return response.data;
    } catch (err){
        console.log("error happened on server side", err)
        return { adopt_post: [] }
    }

}