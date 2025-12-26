// // import FollowButton from '@/components/FollowButton/FollowButton';
// // import { prisma } from '@/lib/prisma';
// // import { Metadata } from 'next';
// // import styles from './Page.module.css';

// // interface Props {
// //   params: Promise<{
// //     id: string;
// //   }>;
// // }

// // export async function generateMetadata(props: Props): Promise<Metadata> {
// //   const params = await props.params;
// //   const user = await prisma.user.findUnique({ where: { id: params.id } });
// //   return { title: `User profile of ${user?.name}` };
// // }

// // export default async function UserProfile(props: Props) {
// //   const params = await props.params;
// //   const user = await prisma.user.findUnique({ where: { id: params.id } });
// //   const { name, bio, image, id } = user ?? {};

// //   return (
// //     // <div>
// //     //   <h1>{name}</h1>

// //     //   <img
// //     //     width={300}
// //     //     src={image ?? '/mememan.webp'}
// //     //     alt={`${name}'s profile`}
// //     //   />

// //     //   <h3>Bio</h3>
// //     //   <p>{bio}</p>

// //     //   {/* @ts-expect-error Server Component */}
// //     //   <FollowButton targetUserId={params.id} />
// //     // </div>
// //     <div className={styles.container}>
// //       <h1 className={styles.name}>{name}</h1>

// //       <img
// //         className={styles.profileImage}
// //         src={image ?? '/mememan.webp'}
// //         alt={`${name}'s profile`}
// //       />

// //       <h3 className={styles.bioTitle}>Bio</h3>
// //       <p className={styles.bioText}>{bio ?? 'No bio available.'}</p>

// //       <div className={styles.followButtonWrapper}>
// //         <FollowButton targetUserId={params.id} />
// //       </div>
// //     </div>
// //   );
// // }

// //*-----------------------------------------------------------------------------------------------------
// // import FollowButton from '@/components/FollowButton/FollowButton';
// // import { prisma } from '@/lib/prisma';
// // import { Metadata } from 'next';

// // interface Props {
// //   params: {
// //     id: string;
// //   };
// // }

// // export async function generateMetadata({ params }: Props): Promise<Metadata> {
// //   const user = await prisma.user.findUnique({ where: { id: params.id } });
// //   return { title: `User profile of ${user?.name ?? 'User'}` };
// // }

// // export default async function UserProfile({ params }: Props) {
// //   const user = await prisma.user.findUnique({ where: { id: params.id } });
// //   const { name, bio, image } = user ?? {};

// //   return (
// //     <div>
// //       <h1>{name ?? 'Unknown User'}</h1>

// //       <img
// //         width={300}
// //         src={image ?? '/mememan.webp'}
// //         alt={`${name ?? 'User'}'s profile`}
// //       />

// //       <h3>Bio</h3>
// //       <p>{bio ?? 'No bio available.'}</p>

// //       <FollowButton targetUserId={params.id} />
// //     </div>
// //   );
// // }
// //*------------------------------------------------------------------------------------------------------
// import FollowButton from '@/components/FollowButton/FollowButton';
// import { prisma } from '@/lib/prisma';
// import { Metadata } from 'next';
// import styles from './Page.module.css';

// interface Props {
//   params: {
//     id: string;
//   };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.id } });
//   return { title: `User profile of ${user?.name ?? 'Unknown'}` };
// }

// export default async function UserProfile({ params }: Props) {
//   const user = await prisma.user.findUnique({ where: { id: params.id } });

//   if (!user) {
//     return <div>User not found</div>;
//   }

//   const { name, bio, image } = user;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.name}>{name}</h1>

//       <img
//         className={styles.profileImage}
//         src={image ?? '/mememan.webp'}
//         alt={`${name}'s profile`}
//       />

//       <h3 className={styles.bioTitle}>Bio</h3>
//       <p className={styles.bioText}>{bio ?? 'No bio available.'}</p>

//       <div className={styles.followButtonWrapper}>
//         <FollowButton targetUserId={params.id} />
//       </div>
//     </div>
//   );
// }
//*-----------------------------------------------------------------------------------------
// import FollowButton from '@/components/FollowButton/FollowButton';
// import { prisma } from '@/lib/prisma';
// import { Metadata } from 'next';
// import Image from 'next/image';
// import styles from './Page.module.css';

// interface Props {
//   params: { id: string };
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const user = await prisma.user.findUnique({ where: { id: params.id } });
//   return { title: `User profile of ${user?.name ?? 'Unknown'}` };
// }

// export default async function UserProfile({ params }: Props) {
//   const user = await prisma.user.findUnique({ where: { id: params.id } });
//   if (!user) return <div>User not found</div>;

//   const { name, bio, image } = user;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.name}>{name}</h1>
//       <Image
//         src={image ?? '/mememan.webp'}
//         alt={`${name}'s profile`}
//         width={300}
//         height={300}
//         className={styles.profileImage}
//       />
//       <h3 className={styles.bioTitle}>Bio</h3>
//       <p className={styles.bioText}>{bio ?? 'No bio available.'}</p>
//       <div className={styles.followButtonWrapper}>
//         <FollowButton targetUserId={params.id} />
//       </div>
//     </div>
//   );
// }
//*----------------------------------------------------------------------------------------
import FollowButton from '@/components/FollowButton/FollowButton';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import styles from './Page.module.css';

// No need for a custom Props interface anymore

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params; // ← await here
  const user = await prisma.user.findUnique({ where: { id } });

  return {
    title: `User profile of ${user?.name ?? 'Unknown'}`,
  };
}

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ← await here
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) return <div>User not found</div>;

  const { name, bio, image } = user;

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      <Image
        src={image ?? '/mememan.webp'}
        alt={`${name}'s profile`}
        width={300}
        height={300}
        className={styles.profileImage}
      />
      <h3 className={styles.bioTitle}>Bio</h3>
      <p className={styles.bioText}>{bio ?? 'No bio available.'}</p>
      <div className={styles.followButtonWrapper}>
        <FollowButton targetUserId={id} />
      </div>
    </div>
  );
}
