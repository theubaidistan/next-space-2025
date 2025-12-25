// types/next-auth.d.ts
import NextAuth from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      bio?: string | null;
      age?: number | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    bio?: string | null;
    age?: number | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    bio?: string | null;
    age?: number | null;
  }
}
