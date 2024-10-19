export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="fixed right-0 top-15 z-10 h-screen w-60 bg-gray-800">
        <ul className="flex flex-col gap-5 ml-10 mt-10">
          <li className="text-white cursor-pointer">Home</li>
          <li className="text-white cursor-pointer">About</li>
          <li className="text-white cursor-pointer">Profile</li>
        </ul>
      </nav>
      <div>{children}</div>
    </>
  );
}
