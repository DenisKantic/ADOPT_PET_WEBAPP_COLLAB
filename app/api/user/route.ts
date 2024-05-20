import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";


export async function POST(req: Request) {
    try {
      // destructure input fields from the incoming request
      const body = await req.json();
      const { email, name, password } = body;
  
      // check if email already exists
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: email }
      });

      if(existingUserByEmail) {
        return NextResponse.json({ user: null, message: "User with this email already exists"}, 
        { status: 409 })
      }

      // hashing password
      const hashedPassword = await hash(password, 8);
      const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
      });

      const { password: newUserPassword, ...rest } = newUser;
  
      return NextResponse.json({ user: rest, message: "User created successfully"}, { status: 201 });
  
    } catch (error) {
      return NextResponse.json({ message: "Something went wrong!"}, { status: 500 });
    }
 }