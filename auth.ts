import NextAuth from "next-auth";
import {PrismaAdapter} from '@auth/prisma-adapter'
import { PrismaClient } from "@prisma/client"
import Google from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const {handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
})
