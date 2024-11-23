/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  usePathname,
  // useRouter
} from "next/navigation";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const getTextStyle = (pathname: string, route: string) => {
  const activeText = "text-white hover:text-blue-300";
  const inactiveText = "text-blue-300 hover:text-white";

  if (pathname === route) return activeText;
  else return inactiveText;
};

export default function Navbar() {
  const pathName = usePathname();
  console.log(pathName);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const { data: session, status }: { data: any; status: string } = useSession();
  console.log(session);
  // console.log(session?.user);
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
      <button>
        {status === "unauthenticated" ? (
          <div
            onClick={() => {
              signIn();
            }}
            className="font-semibold px-3 py-1 bg-white text-blue-950 rounded-md hover:bg-blue-200"
          >
            Log In
          </div>
        ) : (
          <div className="relative">
            <div
              className="font-semibold px-3 py-1 bg-white text-blue-950 rounded-md hover:bg-blue-200"
              onClick={() => setShowLogout(!showLogout)}
            >
              <div className="flex items-center gap-2">
                <FaUserCircle />
                {session?.user?.fullname}
              </div>
            </div>
            {showLogout && (
              <div
                className="absolute w-full text-center px-3 py-1 bg-white text-blue-950 rounded-md hover:bg-blue-200 outline-blue-950 outline-2 outline"
                onClick={() => {
                  signOut();
                }}
              >
                <div className="flex items-center gap-2">
                  <MdOutlineLogout  />
                  Logout
                </div>
              </div>
            )}
          </div>

          // </div>
        )}
      </button>
    </nav>
  );
}
