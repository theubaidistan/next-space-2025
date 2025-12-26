// import type { NextAuthOptions } from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/lib/prisma';

// export const authOptions: NextAuthOptions = {
//   secret: process.env.NEXTAUTH_SECRET,
//   adapter: PrismaAdapter(prisma),

//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//       profile(profile) {
//         return {
//           id: profile.id.toString(),
//           name: profile.name || profile.login,
//           email: profile.email,
//           image: profile.avatar_url,
//           bio: profile.bio ?? null,
//           age: null,
//         };
//       },
//     }),
//   ],

//   callbacks: {
//     async session({ session, user }) {
//       if (session.user) {
//         session.user.id = user.id;
//         session.user.bio = user.bio;
//         session.user.age = user.age;
//       }
//       return session;
//     },

//     async signIn({ user, profile }) {
//       try {
//         await prisma.user.update({
//           where: { id: user.id },
//           data: {
//             bio: (profile as any)?.bio ?? user.bio,
//             age: user.age ?? null,
//           },
//         });
//       } catch (err) {
//         console.error('Error updating user:', err);
//       }
//       return true;
//     },
//   },
// };
//*--------------------------------------------------------------------------------------------------------------
import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: { prompt: 'select_account' }, // ✅ Add this line
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          bio: profile.bio ?? null,
          age: null,
        };
      },
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.bio = user.bio;
        session.user.age = user.age;
      }
      return session;
    },

    async signIn({ user, profile }) {
      try {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            bio: (profile as any)?.bio ?? user.bio,
            age: user.age ?? null,
          },
        });
      } catch (err) {
        console.error('Error updating user:', err);
      }
      return true;
    },
  },
};
