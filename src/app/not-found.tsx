"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="mt-14 flex items-center justify-center content-center">
      <div className="text-center">
        <Image src={"/404.png"} width={300} height={300} alt="404" />
        <div className="mb-2">
          <p className="text-blue-950 font-bold text-2xl">Page Not Found</p>
          <Link
            href={"/"}
            // onClick={() => router.back()}
            className="bg-blue-900 hover:bg-blue-950 text-white px-4 py-2 rounded-md mt-4 mb-2 block"
          >
            Back to home
          </Link>
        </div>
        <button
          onClick={() => router.back()}
          className="text-blue-950 hover:underline hover:font-semibold"
        >
          Back to previous page
        </button>
      </div>
    </div>
  );
}
