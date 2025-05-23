import About from "@/components/About";
import { fetchPages } from "@/lib/notion";
import Link from "next/link";

// This makes the page dynamic instead of static
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await fetchPages();
  return (
    <div>
      <About />
      <div className="text-md">
        <div className="font-medium">Blogs</div>
        {posts.results.map((post: any) => {
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
