"use client";

export default function AdminProductPage() {
  const revalidate = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/revalidate?tag=products&secret=12345678`, {
      method: "POST",
    });

    const response = await res.json(); 
    alert(response.message);
  };
  return (
    <div className="flex-1 flex justify-center items-center bg-gray-300 rounded-md">
      <div className="relative group z-10">
        <button
          className="bg-blue-300 hover:bg-blue-400 p-3 rounded-md font-bold shadow-2xl"
          type="submit"
          onClick={revalidate}
        >
          <div className="block w-[97px] h-[42px] absolute top-3 left-3 bg-slate-400 rounded-ee-md -z-10 duration-300 group-hover:-translate-x-2 group-hover:-translate-y-2"></div>
          Revalidate
        </button>
      </div>
    </div>
  );
}
