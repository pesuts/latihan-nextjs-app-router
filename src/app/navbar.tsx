import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex bg-gray-800 py-3 px-5">
      <h1 className="text-white">Navbar</h1>
      <ul className="flex gap-8 ml-10 text-blue-300">
        <Link href={"/"} className="cursor-pointer">
          Home
        </Link>
        <Link href={"/about"} className="cursor-pointer">
          About
        </Link>
        <Link href={"/about/profile"} className="cursor-pointer">
          Profile
        </Link>
      </ul>
    </nav>
  );
}
