"use server"
import * as z from "zod"
import { LoginSchema } from "@public/schema"
import { signIn } from "@public/auth"
import { AuthError } from "next-auth"



export const loginZod = async (values: z.infer<typeof LoginSchema>) =>{

    const validateFields = LoginSchema.safeParse(values);


    if(!validateFields.success){
        return {error: "Nevažeća polja"}
    }

    const {email,password} = validateFields.data

    try {
        await signIn("credentials",{
            email,
            password,
            redirectTo: "/dashboard"
        })
    } catch (error) {
        if(error instanceof AuthError){
            switch (error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials"}
                    default:
                        return {error:"something went wrong"}
            }
        }

        throw error;
    }

}