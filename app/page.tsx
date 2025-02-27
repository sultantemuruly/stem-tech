import About from "@/components/About";

export default function Home() {
  return (
    <div>
      <About />
      <div>{process.env.NOTION_DATABASE_ID!}</div>
      <div>{process.env.NOTION_TOKEN!}</div>
    </div>
  );
}
