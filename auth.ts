import NextAuth from "next-auth";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { PrismaClient } from "@prisma/client"
import GoogleProvider from "next-auth/providers/google";


const prisma = new PrismaClient()

export const {handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    })
  ]
})