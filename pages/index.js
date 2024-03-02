import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
import styles from "./index.module.css";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Fanny's Blog on Notion</title>
        {/* Title on the Blog - not on the page itself */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Fanny's Blog on Notion</h1>
          <p>
            Thank you for stopping by. I hope your visit is worthwhile.
          </p>
        </header>

        <h2 className={styles.heading}>All Blog Posts</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              },
            );
            const slug = new Text(post.properties.Slug.text);
            console.log(slug);
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>

                <p className={styles.postDescription}>{date}</p>
                <Link href={`/${post.id}`}>Read full post →</Link>
              </li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
