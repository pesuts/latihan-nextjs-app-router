import { randomInt } from "crypto";
import Image from "next/image";
import Link from "next/link";
import { FaCartShopping, FaFire } from "react-icons/fa6";

type DetailProductPageProps = {
  params: { slug: string };
};

async function getData() {
  const response = await fetch("https://fakestoreapi.com/products");
  // const response = await fetch("http://localhost:3000/api/product", {
  //   cache: "no-store",
  // });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  // console.log(response);
  return response.json();
}

export default async function DetailProductPage(props: DetailProductPageProps) {
  const { params } = props;
  const products = await getData();
  const productsData = products?.data ?? products;
  return (
    <div>
      <h1> {params.slug ? "Detail Product Page" : "Product Page"}</h1>
      {productsData.length > 0 && (
        <div className="grid grid-cols-4 gap-8 m-5">
          {productsData.map(
            (product: {
              id: number;
              title: string;
              price: number;
              description: string;
              category: string;
              image: string;
              rating: string;
            }) => {
              const discount = 5 + randomInt(25);
              return (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="border-2 rounded-md duration-500 bg-white hover:z-50 relative hover:scale-110"
                >
                  {discount > 20 ? (
                    <div className="absolute top-6 left-0 w-14 h-6 z-50 bg-red-600">
                      <div className="flex items-center gap-1">
                        <FaFire size={16} className="text-white ps-1" />
                        <p className="text-white text-center">Hot!</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col justify-between h-full">
                    <div className="px-8 py-4">
                      {product.image && (
                        <Image
                          src={product.image}
                          className="w-full h-60 object-contain my-2"
                          alt={product.image}
                          width={300}
                          height={300}
                        />
                      )}
                      <p className="text-md font-bold">{product.title}</p>
                    </div>
                    {/* <div className="grow"></div> */}
                    <div className="border-t-4 bg-slate-100">
                      <div className="px-6 py-4">
                        <div className="flex justify-between items-center">
                          <div className="items-start content-start justify-start">
                            <div className="flex items-center gap-1">
                              <p className="text-slate-500 text-sm line-through">
                                {(
                                  (discount / 100) * product.price +
                                  product.price
                                ).toLocaleString("en", {
                                  currency: "USD",
                                  style: "currency",
                                })}
                              </p>
                              <span className="text-red-500 bg-red-100 text-xs rounded-sm px-1">
                                -{Math.floor(discount)}%
                              </span>
                            </div>
                            <p className="text-red-600 font-bold text-xl">
                              {product.price.toLocaleString("en", {
                                currency: "USD",
                                style: "currency",
                              })}
                            </p>
                          </div>
                          <Link
                            href={`/product/add/${product.id}`}
                            className="bg-red-600 text-white hover:bg-red-800 rounded-md px-2 py-3"
                          >
                            <div className="flex items-center gap-2 justify-center">
                              <FaCartShopping size={18} />
                              <p className="text-sm">Add to Cart</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>
      )}
      {params.slug && (
        <>
          {params?.slug[0] && <p> Category: {params.slug[0]}</p>}
          {params?.slug[1] && <p> Gender: {params.slug[1]}</p>}
          {params?.slug[2] && <p> Id: {params.slug[2]}</p>}
        </>
      )}
    </div>
  );
}
