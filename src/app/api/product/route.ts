import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  // const id = new URL(request.url).searchParams.get("id");
  // console.log(id);
  
  const data = [
    {
      id: 1,
      name: "Sepatu Baru",
      price: 100000,
    },
    {
      id: 2,
      name: "Sepatu Lama",
      price: 35000,
    },
  ];
  console.log(data.find((data) => data.id === Number(id)));
  const detailData = data.find((data) => data.id === Number(id));
  if (!detailData) { 
    return NextResponse.json({ status: 404, message: "Not Found", data: {} });
  }
  return NextResponse.json({ status: 200, message: "Success", data: detailData });
}
