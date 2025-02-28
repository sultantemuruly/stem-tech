import About from "@/components/About";
import { fetchPages } from "@/lib/notion";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchPages();

  return (
    <div>
      <About />
      <div className="text-md">
        <div className="font-medium">Blogs</div>
        {posts.results.map((post: any) => {
          console.log(post.properties);
          return (
            <article key={post.id} className="flex justify-between">
              <Link
                href={`/blog/${post.properties.slug.rich_text[0].plain_text}`}
                className="underline"
              >
                {post.properties.Title.title[0].plain_text}
              </Link>
              <div>
                {post.properties.Date?.created_time
                  ? new Date(
                      post.properties.Date.created_time
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "No Date"}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
