import Link from "next/link";
import { Button } from "./button";

export default function Header() {
  return (
    <header className="w-full bg-[#003b95] shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Flight Application
        </Link>

        <Link href="/bookmarks">
          <Button variant="secondary" className="text-[#003b95] bg-white hover:bg-gray-100">
            Favoritos
          </Button>
        </Link>
      </div>
    </header>
  );
}