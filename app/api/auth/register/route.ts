import { connectToDatabase } from "@/app/helpers/server-helpers"
import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"
import bcrypt from 'bcrypt'

export const POST = async (req: Request) => {
    try{
        const {name, email,password} = await req.json()
        if(!name || !email || !password){
            return NextResponse.json({message: "Invalid data"}, {status: 422})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectToDatabase()
        const user = await prisma.user.create(
            {data:{email,name,hashedPassword}
        })

        return NextResponse.json({user}, {status: 201})
    } catch(error){
        console.log(error);
        throw Error;
    } finally {
        await prisma.$disconnect()
    }
}