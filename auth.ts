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
  providers: [Google]
})
