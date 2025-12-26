// import styles from './Post.module.css';
// export const revalidate = 1200; // not necessary, just for ISR demonstration

// interface Post {
//   title: string;
//   content: string;
//   slug: string;
// }

// export async function generateStaticParams() {
//   const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
//     (res) => res.json()
//   );

//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// interface Props {
//   params: Promise<{ slug: string }>;
// }

// export default async function BlogPostPage(props: Props) {
//   const params = await props.params;
//   // deduped
//   const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
//     (res) => res.json()
//   );
//   const post = posts.find((post) => post.slug === params.slug)!;

//   return (
//     <div className={styles.postContainer}>
//       <h1 className={styles.postTitle}>{post.title}</h1>
//       <p className={styles.postContent}>{post.content}</p>
//     </div>
//   );
// }
//*----------------------------------------------------------------------------------------------------------------
import styles from './Post.module.css';

export const revalidate = 1200;

interface Post {
  title: string;
  content: string;
  slug: string;
}

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export async function generateStaticParams() {
  const res = await fetch(`${BASE_URL}/api/content`, {
    next: { revalidate: 1200 },
  });

  const posts: Post[] = await res.json();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const res = await fetch(`${BASE_URL}/api/content`, {
    next: { revalidate: 1200 },
  });

  const posts: Post[] = await res.json();

  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <div className={styles.postContainer}>
      <h1 className={styles.postTitle}>{post.title}</h1>
      <p className={styles.postContent}>{post.content}</p>
    </div>
  );
}
