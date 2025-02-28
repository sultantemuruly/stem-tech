import About from "@/components/About";
import { fetchPages } from "@/lib/notion";

export default async function Home() {
  const post = await fetchPages();

  return (
    <div>
      <About />
      <div className="text-md">
        <div className="font-medium">Blogs</div>
      </div>
    </div>
  );
}
