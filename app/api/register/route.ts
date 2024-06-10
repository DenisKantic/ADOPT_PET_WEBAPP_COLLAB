import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'
import bcrypt from "bcrypt"

export async function POST(
  req: Request,
){
  try{

    const body = await req.json();

    const { email, password } = body;
    
    if(!email || !password){
      return new NextResponse("Missing data", {status: 500});
    }

    const userAlreadyExist = await prisma.user.findFirst({
        where: {
            email: email,
        }
    })

    if(userAlreadyExist?.id){
      return new NextResponse("User already exist", {status: 500});
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
      }
    });

    return NextResponse.json(newUser);
    
  } catch(err: any){
    console.log("REGISTER_ERR: " + err);
    return new NextResponse(err, {status: 500});
  }
}