import { DefaultSession } from 'next-auth';

// Extend the session interface to include the user id and username

declare module 'next-auth' {
    interface Session {
      user: {
        id: string;
        username: string;
      } & DefaultSession["user"];
    }
  }


  declare module 'next-auth/jwt' {
    interface JWT {
      id: string;
      name: string;
    }
  }