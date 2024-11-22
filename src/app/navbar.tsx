/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  usePathname,
  // useRouter
} from "next/navigation";

const getTextStyle = (pathname: string, route: string) => {
  const activeText = "text-white hover:text-blue-300";
  const inactiveText = "text-blue-300 hover:text-white";

  if (pathname === route) return activeText;
  else return inactiveText;
};

export default function Navbar() {
  const pathName = usePathname();
  console.log(pathName);

  const { status }: { data: any; status: string } = useSession();
  // const router = useRouter();

  return (
    <nav className="flex bg-gray-800 py-3 items-center justify-between px-16">
      <Link href="/" className=" text-white font-bold text-2xl">
        Navbar
      </Link>
      <ul className="flex gap-8 font-semibold">
        <Link href={"/"} className={getTextStyle(pathName, "/")}>
          Home
        </Link>
        <Link href={"/about"} className={getTextStyle(pathName, "/about")}>
          About
        </Link>
        <Link
          href={"/about/profile"}
          className={getTextStyle(pathName, "/about/profile")}
        >
          Profile
        </Link>
      </ul>
      <button
        onClick={() => {
          if (status === "unauthenticated") {
            signIn();
          } else signOut();
          // (status === "unauthenticated") ? signIn() : signOut();
          // router.push("/login");
        }}
        className="font-semibold px-3 py-1 bg-white text-blue-950 rounded-md hover:bg-blue-200"
      >
        {status === "unauthenticated" ? "Log In" : "Log Out"}
      </button>
    </nav>
  );
}
