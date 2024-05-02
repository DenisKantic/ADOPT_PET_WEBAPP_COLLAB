import NextAuth from "next-auth";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { PrismaClient } from "@prisma/client"
import Google from 'next-auth/providers/google'

const prisma = new PrismaClient()

export const {handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.png"
  },
  adapter: PrismaAdapter(prisma),
  providers: [Google] 
})