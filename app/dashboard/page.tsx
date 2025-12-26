// import { getServerSession } from 'next-auth';
// import { prisma } from '@/lib/prisma';
// import { ProfileForm } from './ProfileForm';
// import { redirect } from 'next/navigation';
// import { SignOutButton } from '@/components/buttons';
// import { authOptions } from '../api/auth/[...nextauth]/route';

// export default async function Dashboard() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect('/api/auth/signin');
//   }

//   const currentUserEmail = session?.user?.email!;
//   const user = await prisma.user.findUnique({
//     where: {
//       email: currentUserEmail,
//     },
//   });

//   return (
//     <>
//       <h1>Dashboard</h1>
//       <SignOutButton />
//       <ProfileForm user={user} />
//     </>
//   );
// }
//*--------------------------------------------------------------------------------------------------------------
// import { getServerSession } from 'next-auth';
// import { prisma } from '@/lib/prisma';
// import { ProfileForm } from './ProfileForm';
// import { redirect } from 'next/navigation';
// import { SignOutButton } from '@/components/buttons';
// import { authOptions } from '../api/auth/[...nextauth]/route';

// export default async function Dashboard() {
//   const session = await getServerSession(authOptions);

//   // Redirect if no session or no email
//   if (!session?.user?.email) {
//     redirect('/api/auth/signin');
//   }

//   const currentUserEmail = session.user.email;

//   // Fetch the user from the database
//   const user = await prisma.user.findUnique({
//     where: {
//       email: currentUserEmail,
//     },
//   });

//   // Redirect if user not found in DB
//   if (!user) {
//     redirect('/api/auth/signin');
//   }

//   return (
//     <>
//       <h1>Dashboard</h1>
//       <SignOutButton />
//       <ProfileForm user={user} />
//     </>
//   );
// }
//*----------------------------------------------------------------------------------------------
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ProfileForm } from './ProfileForm';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/buttons';
// import { authOptions } from '../api/auth/[...nextauth]/route';
import { authOptions } from '@/lib/auth';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/api/auth/signin');
  }

  const currentUserEmail = session.user.email;

  const user = await prisma.user.findUnique({
    where: { email: currentUserEmail },
  });

  if (!user) {
    redirect('/api/auth/signin');
  }

  // Normalize nulls to undefined for your ProfileForm
  const normalizedUser = {
    name: user.name ?? undefined,
    bio: user.bio ?? undefined,
    age: user.age ?? undefined,
    image: user.image ?? undefined,
  };

  return (
    <>
      <h1>Dashboard</h1>
      <SignOutButton />
      <ProfileForm user={normalizedUser} />
    </>
  );
}
