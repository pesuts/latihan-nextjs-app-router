"use client";
import { useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session }: { data: any } = useSession();

  return (
    <>
      <h1 className="text-center mt-20 font-bold text-2xl">Profil Page</h1>
      <div className="flex items-center justify-center">
        <div className="outline outline-blue-950 outline-2 mt-20 px-20 py-12 bg-yellow-200 flex flex-col items-center rounded-lg">
          <FaUserCircle size={80} />
          <h2 className="mt-6 text-lg font-semibold">{session?.user?.fullname}</h2>
        </div>
      </div>
    </>
  );
}
