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
        <title>Fanny's Mini Blog</title>
        {/* Title on the Blog - not on the page itself */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <header className={styles.header}>
          <h1>Fanny's Mini Blog</h1>
          <p>
            I write stuffs.
          </p>
        </header>

        <h2 className={styles.heading}>What do I write</h2>
        <ol className={styles.posts}>
          {posts.map((post) => {
            //console.log(post);
            //console.log("Published "+post.properties.Published.checkbox);
            //console.log("Slug "+post.properties.Slug.rich_text[0].text.content);
            //console.log("Tags "+post.properties.Tags.multi_select[0].name);
            //console.log("Image URL: "+post.properties.Image.url);
            //console.log(Object.entries(post.properties.Blurbs.rich_text));

            //const blurbs = post.properties.Blurbs.rich_text[0].text;
            const date = new Date(post.created_time).toLocaleString(
              "en-GB",
              {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                weekday:"long",
              },
            );
            
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
