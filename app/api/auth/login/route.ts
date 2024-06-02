import { connectToDatabase } from "@/app/helpers/server-helpers"
import { NextResponse } from "next/server"
import {prisma} from "@/lib/prisma"
import bcrypt from 'bcrypt'

export const POST = async (req:Request) => {
  console.log("found user")
    try{
        const {email,password} = await req.json()
        if(!email || !password){
            return NextResponse.json({message: "Invalid data"}, {status: 422})
        }
        
        await connectToDatabase()
        
        const user = await prisma.user.findFirst({
            where:{
                email: email
            }
        })
    

        if (!user || !user.hashedPassword) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
          }
      
          const isMatch = await bcrypt.compare(password, user.hashedPassword);
      
          if (isMatch) {
            console.log("Success");
            window.location.href="/dashboard"
            return console.log({ message: "Login successful" }, { status: 200 });
          } else {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
          }
        } catch (error) {
          console.log(error);
          return NextResponse.json({ message: "Internal server error" }, { status: 500 });
        } finally {
          await prisma.$disconnect();
        }
      }