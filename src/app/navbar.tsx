/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  // useRouter
} from "next/navigation";
import { useState } from "react";
// import { FaArrowAltCircleDown, FaUserCircle } from "react-icons/fa";
// import { FaArrowDown } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

const getTextStyle = (pathname: string, route: string) => {
  const activeText = "text-white hover:text-blue-300";
  const inactiveText = "text-blue-300 hover:text-white";

  if (pathname === route) return activeText;
  else return inactiveText;
};

export default function Navbar() {
  const pathName = usePathname();
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const { data: session, status }: { data: any; status: string } = useSession();
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
      <div>
        {status === "unauthenticated" ? (
          <button
            onClick={() => {
              signIn();
            }}
            className="font-semibold px-3 py-1 bg-white text-blue-950 rounded-md hover:bg-blue-200"
          >
            Log In
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <p className="text-white font-semibold">
              {session?.user?.fullname}
            </p>
              <button
                className="relative" onClick={() => setShowLogout(false)}>
              <div
                className="font-semibold px-3 py-1 bg-white text-blue-950 rounded-md hover:bg-blue-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLogout(!showLogout);
                }}
              >
                <div className="flex items-center gap-2">
                  {/* <FaUserCircle /> */}
                  <Image
                    width={25}
                    height={25}
                    src={"/images/profile.png"}
                    alt="profile"
                  />
                  <IoIosArrowDown />
                  {/* {session?.user?.fullname} */}
                </div>
              </div>
              {showLogout && (
                <div
                  className="absolute text-center px-4 py-2 right-0 bg-white text-blue-950 rounded-md hover:bg-blue-200 outline-blue-950 outline-2 outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    signOut();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MdOutlineLogout />
                    Logout
                  </div>
                </div>
              )}
            </button>
          </div>

          // </div>
        )}
      </div>
    </nav>
  );
}
