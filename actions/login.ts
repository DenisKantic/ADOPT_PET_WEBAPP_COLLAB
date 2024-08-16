"use server"
import * as z from "zod"
import { LoginSchema } from "@public/schema"
import axios from 'axios'
import {useAuth} from "../src/app/AuthContext"



export const loginZod = async (values: z.infer<typeof LoginSchema>) =>{

    const validateFields = LoginSchema.safeParse(values);


    if(!validateFields.success){
        return {error: "Nevažeća polja"}
    }

    const {email,password} = validateFields.data

    const formData = new FormData();
    formData.append("email", email)
    formData.append("password", password);

    try {
        // const response = await Login(formData)

        // return response

    } catch (error) {
        console.log("Error login user", error)
        }
    }