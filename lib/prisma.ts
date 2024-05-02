import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  const neon = new Pool({ connectionString: process.env.DATABASE_URL }); //making it to be edge compatible
  const adapter = new PrismaNeon(neon); // also for making edge compatible
  return new PrismaClient({ adapter });
};

/* prisma is not by default "edge compatible" like the next auth. What that means is 
it needs to be runned first before anything else, so that's why we need to make prisma to be
edge compatible since while we use it for database */

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;


// copy paste from official docs 
