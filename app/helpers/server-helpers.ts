import { prisma } from "@/lib/prisma"

export const connectToDatabase = async () =>{
    try{
        await prisma.$connect();
    } catch (error){
        console.log(error)
        throw Error("Unable to connect");
    }
}