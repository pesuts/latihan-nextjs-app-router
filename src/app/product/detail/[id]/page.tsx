import { getData } from "@/services/products";
import Image from "next/image";

import { GetServerSidePropsContext } from "next";

export default async function detailProductPage(
  props: GetServerSidePropsContext
) {
  const { params } = props;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/product?id=${params?.id}`;
  const { data } = await getData(url);

  return (
    <div className="container mx-auto my-10">
      <div className="w-96 mx-auto border border-gray-700">
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
      </div>
    </div>
  )
}
