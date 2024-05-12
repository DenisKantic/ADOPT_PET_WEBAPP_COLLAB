import NextAuth from "next-auth";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { PrismaClient } from "@prisma/client"
import Google from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import Credentials from "@auth/core/providers/credentials"
import { compare } from "bcrypt";

const prisma = new PrismaClient()

export const {handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "youremail@mail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials: any) {
          if(!credentials?.email || !credentials?.password) {
            throw new Error('Please enter an email and password')
          }
          
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials?.email }
          });
          if(!existingUser) {
            return null;
          }

          const passwordMatch = await compare(credentials.password, existingUser.password)

          if(!passwordMatch) {
            return null;
          }

          return {
            id: `${existingUser.id}`,
            name: existingUser.name,
            email: existingUser.email
          }
        }
      })
],
secret: process.env.NEXT_PUBLIC_SECRET,
})
