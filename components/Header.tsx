import { Github } from "lucide-react";

const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-lg md:text-xl">
          Sultan Temuruly&apos;s website
        </h1>
      </div>
      <div>
        <a
          href="https://github.com/sultantemuruly"
          className="flex items-center p-2 text-black rounded-lg hover:bg-slate-300 transition duration-300"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};
export default Header;
