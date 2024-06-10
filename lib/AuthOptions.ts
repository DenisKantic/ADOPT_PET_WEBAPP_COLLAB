import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {prisma} from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email
          }
        });

        if(!user || !user.id || !user.password){
          throw new Error("Invalid credentials");
        }

        const correctPassword = (credentials.password, user.password);

        if(!correctPassword){
          throw new Error("Invalid credentials");
        }

        return user;
      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV !== "production",
}