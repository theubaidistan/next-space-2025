// import { getServerSession } from 'next-auth';
// import FollowClient from './FollowClient';
// import { prisma } from '@/lib/prisma';
// import { authOptions } from '../../app/api/auth/[...nextauth]/route'

// interface Props {
//   targetUserId: string;
// }

// export default async function FollowButton({ targetUserId }: Props) {
//   const session = await getServerSession(authOptions);

//   const currentUserId = await prisma.user
//     .findFirst({ where: { email: session?.user?.email! } })
//     .then((user) => user?.id!);

//   const isFollowing = await prisma.follows.findFirst({
//     where: { followerId: currentUserId, followingId: targetUserId },
//   });

//   return (
//     <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
//   );
// }
//*--------------------------------------------------------------------------------------
import { getServerSession } from 'next-auth';
import FollowClient from './FollowClient';
import { prisma } from '@/lib/prisma';
// import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { authOptions } from '@/lib/auth';

interface Props {
  targetUserId: string;
}

export default async function FollowButton({ targetUserId }: Props) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    // Handle the case when the user is not logged in
    return null;
  }

  const currentUser = await prisma.user.findFirst({
    where: { email: session.user.email },
    select: { id: true }, // select only id for efficiency
  });

  if (!currentUser) {
    // Handle the case when the user is not found in DB
    return null;
  }

  const isFollowing = await prisma.follows.findFirst({
    where: { followerId: currentUser.id, followingId: targetUserId },
  });

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}
