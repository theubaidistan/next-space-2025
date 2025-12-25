import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from './prisma';

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
          bio: profile.bio ?? null,
          age: null,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
        session.user.bio = user.bio;
        session.user.age = user.age;
      }
      return session;
    },
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
