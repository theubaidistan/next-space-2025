// 'use client';

// import { useSession, signIn, signOut } from 'next-auth/react';
// import Image from 'next/image';
// import Link from 'next/link';

// export function SignInButton() {
//   const { data: session, status } = useSession();
//   console.log(session, status);

//   if (status === 'loading') {
//     return <>...</>;
//   }

//   if (status === 'authenticated') {
//     return (
//       <Link href={`/dashboard`}>
//         <Image
//           src={session.user?.image ?? '/mememan.webp'}
//           width={32}
//           height={32}
//           alt="Your Name"
//         />
//       </Link>
//     );
//   }

//   return <button onClick={() => signIn()}>Sign in</button>;
// }

// export function SignOutButton() {
//   return <button onClick={() => signOut()}>Sign out</button>;
// }
//*-------------------------------------------------------------------------------------------------
'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './Button.module.css';

export function SignInButton() {
  const { data: session, status } = useSession();

  // Show a small placeholder while session is loading
  if (status === 'loading') {
    return <span>Loading...</span>;
  }

  // If user is authenticated, show their avatar linking to dashboard
  if (status === 'authenticated' && session.user) {
    return (
      <Link href="/dashboard">
        <Image
          src={session.user.image ?? '/mememan.webp'}
          width={32}
          height={32}
          alt={session.user.name ?? 'User'}
          className="rounded-full"
        />
      </Link>
    );
  }

  // If user is not authenticated, show sign-in button
  return (
    <button
      onClick={() => signIn('github')} // or omit provider to use default
      // className="px-4 py-2 bg-blue-600 text-white rounded"
      className={styles.button}
    >
      Sign in
    </button>
  );
}

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      // className="px-4 py-2 bg-red-600 text-white rounded"
      className={styles.button}
    >
      Sign out
    </button>
  );
}
