import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserByID } from "./data/user";

export const {
    handlers: {GET,POST}, 
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks:{
        async session({token,session}){

            if(token.sub && session.user){
                session.user.id = token.sub
            }

            console.log(session)

            return session
        },
        async jwt({token}){

            if(!token.sub) return token; // this means if we don't have token.sub which is userID, then do nothing

            const existingUser = await getUserByID(token.sub);

            if(!existingUser) return token;


            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"}, // we use jtw strategy session, because database session doesn't work on edge with prisma
    ...authConfig
})