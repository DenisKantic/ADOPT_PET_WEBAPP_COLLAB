"use server"
import * as z from "zod"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@public/schema"
import {db} from "@public/lib/db"
import { getUserByEmail } from "@public/data/user"


export const registerZod = async (values: z.infer<typeof RegisterSchema>)=>{
    const validateField = RegisterSchema.safeParse(values)
    // this is for validating fields on the server side, because on the client side
    // it can be easily manipulated


    if(!validateField.success){
        return {error: "Nevažeća polja"}
    }

    const {email,password, name } = validateField.data;

    const hashedPassword = await bcrypt.hash(password,10);

    const existingUser = await getUserByEmail(email);

    if(existingUser){
        return {error: "Email je već u upotrebi."}
    }

    await db.user.create({
        data:{
            name,
            email,
            password: hashedPassword
        }
    })

    return {sucess: "Korisnik je kreiran!"}
}