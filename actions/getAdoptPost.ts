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

interface OneAdoptPost{
    id: number,
    image_paths: string[],
    category: string,
    petname: string,
    phonenumber: string,
    description: string,
    vakcinisan: boolean,
    cipovan: boolean,
    pasos: boolean,
    spol: string,
    starost: string,
    location: string,
    created_at: string;
}

interface Email{
    sendEmail: string
}

export async function getAdoptPost(){

    let response;

    try{
    response = await axios.get<{adopt_post: AdoptPost[]}>('http://localhost:8080/getAdoptPostHome');
    return response.data;
    } catch (err){
        console.log("error happened on server side", err)
        return { adopt_post: [] }
    }

}


export async function getAdoptPostDashboard({sendEmail}:Email){

    let response;
    console.log("EMAIL I SENT", sendEmail)

    try{
    response = await axios.get<{adopt_post: AdoptPost[]}>('http://localhost:8080/getAdoptPostDashboard',{
        params: { email: sendEmail },
    });
    return response.data;
    } catch (err){
        console.log("error happened on server side", err)
        return { adopt_post: [] }
    }

}

export async function getOneAdoptPost(slug: string) {
    let response;

    try {
        response = await axios.get<{ adopt_post: OneAdoptPost }>(`http://localhost:8080/getOneAdoptPost/${slug}?slug=${slug}`);
        return response.data;
    } catch (err) {
        console.log("Error happened on server side", err)
        return { adopt_post: {
            id: 0,
            image_paths: [],
            category: "",
            petname: "",
            phonenumber: "",
            description: "",
            vakcinisan: false,
            cipovan: false,
            pasos: false,
            spol: "",
            starost: "",
            location: "",
            created_at:""
        } }
    }
}

