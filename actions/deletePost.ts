"use server"
import { db } from "@public/lib/db";


export async function deletePost(id:string){

    try {
        await db.adoptAnimal.delete({where: {id}})

        return {success: true}
        
    } catch (error) {
        console.log("Delete post failed", error)
        return {success: false}
    }
}

export async function deleteDonationPost(id:string){
    try {
        await db.donationPost.delete({where: {id}})

        return {success: true}
        
    } catch (error) {
        console.log("Delete post failed", error)
        return {success: false}
    }
}

export async function deleteLostPetPost(id:string){
    try {
        await db.lostPetPost.delete({where: {id}})

        return {success: true, message: "obrisan oglas"}
        
    } catch (error) {
        console.log("Delete post failed", error)
        return {success: false}
    }
}