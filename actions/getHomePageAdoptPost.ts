"use server"
import axios from 'axios'; 

interface AdoptPost{
    id: number,
    image_paths: string[],
    category: string,
    petname: string,
    spol: string,
    starost: string,
    location: string,
    slug: string,
    created_at: string;
}

export async function getHomeAdoptPost(){

    let response;

    try{
    response = await axios.get<{adopt_post: AdoptPost[]}>('http://localhost:8080/getAdoptPostHome');
    // console.log("REsponse from server", response.data.adopt_post )
    // return response as {data: {adopt_post: AdoptPost[]}}
    } catch (err){
        console.log("error happened on server side", err)
        return { adopt_post: [] }
    }

    return response.data;
}