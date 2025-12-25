// 'use client';

// import { useSession } from 'next-auth/react';

// export default function AuthCheck({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();

//   console.log(session, status);

//   if (status === 'authenticated') {
//     return <>{children}</>;
//   } else {
//     return <></>;
//   }
// }
'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const { data: session, status } = useSession();

  // Optional: show loading state while session is being fetched
  if (status === 'loading') {
    return <p>Loading...</p>; // or return null if you don't want anything
  }

  // Render children only if authenticated
  if (status === 'authenticated') {
    return <>{children}</>;
  }

  // User not authenticated
  return null;
}
