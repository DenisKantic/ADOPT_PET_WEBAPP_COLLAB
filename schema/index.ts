import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "E-mail je obavezan"
    }),
    password: z.string().min(1,{
        message: "Šifra je obavezna"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "E-mail je obavezan"
    }),
    password: z.string().min(8,{
        message: "Minimum 8 karaktera je potrebno"
    }),
    name: z.string().min(1,{
        message: "Ime je obavezno"
    })
})