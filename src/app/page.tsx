import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - NEXTJS APP ROUTER",
  description: "Aplikasi latihan nextjs app router",
  authors: [{ name: "Daniel Sinaga", url: "http://localhost:3000" }],
  icons: {
    icon: '/favicon2.ico'
  },
  openGraph: {
    title: "Home - NEXTJS APP ROUTER",
  },
}

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello World!</h1>
      </main>
    </div>
  );
}
