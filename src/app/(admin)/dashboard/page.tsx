// "use client";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

export default function DashboardPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const { data: session, status }: { data: any; status: string } = useSession();
  // const router = useRouter();
  // console.log(session);
  // console.log(status);

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  //   if (session !== undefined && session?.user?.role !== "admin") { 
  //     router.push("/");
  //   }
  // }, [router, status]);

  return (
    <div className="flex-1 bg-gray-300 flex justify-center items-center rounded-md">
      {/* <div className="w-full h-96 bg-gray-300 rounded-md flex justify-center items-center"> */}
      <h1>Dashboard</h1>
    </div>
  );
}
