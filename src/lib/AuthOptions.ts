import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {prisma} from "./prisma"
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

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if(!user || !user.id || !user.password){
          throw new Error("Invalid credentials");
        }

        const correctPassword = (credentials.password == user.password);

        if(!correctPassword){
          throw new Error("Invalid credentials");
        }

        return user;
      },
    })
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (!session.user?.email) {
        console.error('User email is not available in session.');
        return session;
      }

      // Fetch the user from the database using Prisma
      const dbUser = await prisma.user.findFirst({
        where: { email: session.user.email },
      });

   //   console.log('Database User:', dbUser); // Log the database user result

      // Add id and username to the session object
      if (dbUser) {
        session.user.id = dbUser.id.toString();
        session.user.name = dbUser.name ;
      } else {
        console.error('No user found in database.');
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  debug: process.env.NODE_ENV !== "production",
}