// import NextAuth from "next-auth";
// import type { NextAuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// // import CredentialsProvider from 'next-auth/providers/credentials';
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";

// export const authOptions: NextAuthOptions = {
//   // session: {
//   //   strategy: 'jwt',
//   // },
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     //   CredentialsProvider({
//     //     name: 'as Guest',
//     //     credentials: {},
//     //     async authorize(credentials) {
//     //       const user = {
//     //         id: Math.random().toString(),
//     //         name: 'Guest',
//     //         email: 'guest@example.com',
//     //       };
//     //       return user;
//     //     },
//     //   }),
//     // ],
//     // callbacks: {
//     //   async signIn({ user }) {
//     //     // block signin if necessary
//     //     return true;
//     //   }
//     // },
//   ],
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// import NextAuth from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';

// export const authOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//       profile(profile) {
//         return {
//           id: profile.id.toString(),
//           name: profile.name || profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//           bio: profile.bio || null,
//           age: null,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }: any) {
//       if (session.user) {
//         session.user.id = user.id;
//         session.user.age = user.age;
//         session.user.bio = user.bio;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
//*----------------------------------------------------------------------------------------------
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          bio: profile.bio ?? null, // custom field
          age: null, // optional, no GitHub age
        };
      },
    }),
  ],
  callbacks: {
    // Ensure session includes bio & age
    async session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.bio = user.bio;
        session.user.age = user.age;
      }
      return session;
    },

    // Ensure bio & age are saved in DB on sign-in
    async signIn({ user, profile }: any) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            bio: profile?.bio ?? user.bio,
            age: user.age ?? null,
          },
        });
      } catch (err) {
        console.error('Error updating user bio/age:', err);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
