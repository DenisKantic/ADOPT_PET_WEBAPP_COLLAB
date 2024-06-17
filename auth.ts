import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const {
    handlers: {GET,POST}, 
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"}, // we use jtw strategy session, because database session doesn't work on edge with prisma
    ...authConfig
})