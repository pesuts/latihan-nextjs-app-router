import { getData } from "@/services/products";
import Image from "next/image";

import dynamic from "next/dynamic";

// import Modal from "@/components/core/Modal";
const Modal = dynamic(() => import("@/components/core/Modal"));

export default async function DetailProductPage({ params }: { params: {id: string} }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/product?id=${params?.id}`;
  const { data } = await getData(url);

  return (
    <Modal>
      <Image
        src={data.image}
        width={350}
        height={350}
        alt=""
        className="w-full object-cover aspect-square col-span-2"
      />
      <div className="bg-white p-4 px-6">
        <h3>{data.title}</h3>
        <p>Price: ${data.price}</p>
      </div>
    </Modal>
  );
}
