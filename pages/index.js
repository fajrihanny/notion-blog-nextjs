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
          <h1>Fanny's Review</h1>
          <p>
            I write stuffs - sometimes.
          </p>
        </header>

        <h1 className={styles.heading}>I think and I write</h1>
        <ol className={styles.posts}>
          {posts.map((post) => {
          console.log(post);
          const tagscount = (post.properties.Tags.multi_select).length;
          console.log(tagscount);
          for (let index = 0; index < tagscount; index++) {
            console.log(post.properties.Tags.multi_select[index].name);
          }
            const published_date = new Date(post.properties.Date.date.start).toLocaleString(
              "en-GB",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            );

            const src = post.properties.Image.files[0].type === "external" ? post.properties.Image.files[0].external.url : post.properties.Image.files[0].file.url;
            return (
              <li key={post.id} className={styles.post}>
                <h3 className={styles.postTitle}>
                  <Link href={`/${post.id}`}>
                    <Text text={post.properties.Name.title} />
                  </Link>
                </h3>
                <p className={styles.postDescription}>{published_date}</p>
                <p><img className={styles.featuredImg} src={src}/>    </p>
                <p className={styles.postSummary}>{(post.properties.Summary.rich_text[0].text.content)}</p>  
                
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
