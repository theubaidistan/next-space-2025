// import UserCard from "@/components/UserCard/UserCard";
// import styles from "./page.module.css";
// import { prisma } from "@/lib/prisma";

// export default async function Users() {
//   const users = await prisma.user.findMany();

//   return (
//     <div className={styles.grid}>
//       {users.map((user) => {
//         return <UserCard key={user.id} {...user} />;
//       })}
//     </div>
//   );
// }
// //*------------------------------------------------------------------------------
import UserCard from '@/components/UserCard/UserCard';
import { prisma } from '@/lib/prisma';
import styles from './page.module.css';

export default async function Users() {
  const users = await prisma.user.findMany();

  if (!users.length) return <p>No users found.</p>;

  return (
    <div className={styles.grid}>
      {/* {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))} */}
      {users.map((user) => (
        <UserCard
          key={user.id}
          id={user.id}
          name={user.name ?? 'Unknown'}
          bio={user.bio ?? 'No bio'}
          image={user.image ?? undefined}
        />
      ))}
    </div>
  );
}
