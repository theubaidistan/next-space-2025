// import Link from 'next/link';

// export default async function Blog() {
//   const posts = await fetch('http://localhost:3000/api/content').then((res) =>
//     res.json()
//   );
//   return (
//     <div>
//       <h1>Welcome to our Blog</h1>
//       <ul>
//         {posts.map((post: any) => (
//           <li key={post.slug}>
//             <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//*---------------------------------------------------------------------------------------------------------------
//* 80%
// import Link from 'next/link';
// import styles from './Blog.module.css'; // import CSS module

// interface Post {
//   slug: string;
//   title: string;
//   // Add more fields here if your API returns them
// }

// export default async function Blog() {
//   const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
//     (res) => res.json()
//   );

//   return (
//     // <div>
//     //   <h1>Welcome to our Blog</h1>
//     //   <ul>
//     //     {posts.map((post) => (
//     //       <li key={post.slug}>
//     //         <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//     //       </li>
//     //     ))}
//     //   </ul>
//     // </div>
//     <div className={styles.container}>
//       <h1 className={styles.title}>Welcome to our Blog</h1>
//       <ul className={styles.postList}>
//         {posts.map((post) => (
//           <li key={post.slug} className={styles.postItem}>
//             <Link href={`/blog/${post.slug}`} className={styles.postLink}>
//               {post.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//*----------------------------------------------------------------------------------------
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import styles from './Blog.module.css';

export default async function Blog() {
  // Fetch all posts from the database
  const posts = await prisma.blogPost.findMany({
    select: {
      slug: true,
      title: true,
    },
    orderBy: {
      id: 'desc', // optional: latest posts first
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to our Blog</h1>
      <ul className={styles.postList}>
        {posts.map((post: any) => (
          <li key={post.slug} className={styles.postItem}>
            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
