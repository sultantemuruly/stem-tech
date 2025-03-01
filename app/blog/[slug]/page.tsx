import { fetchBySlug, fetchPageBlocks, notion } from "@/lib/notion";
import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import hljs from "highlight.js";

// Register the plaintext language with hljs directly
hljs.registerLanguage("plaintext", () => ({
  name: "plaintext",
  contains: [],
}));

// Also register it as 'plain text'
hljs.registerAliases("plain text", { languageName: "plaintext" });

// interface PageProps {
//   params: { slug: string };
// }

export default async function Page({ params }: any) {
  const post = await fetchBySlug(params.slug);
  if (!post) return <div>404 page not found</div>;

  const blocks = await fetchPageBlocks(post.id);
  const renderer = new NotionRenderer({
    client: notion,
  });

  // Use the plugin with the pre-configured hljs instance
  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...blocks);

  return (
    <div className="prose" dangerouslySetInnerHTML={{ __html: html }}></div>
  );
}
