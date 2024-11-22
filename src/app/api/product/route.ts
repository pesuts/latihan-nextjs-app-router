import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  // const id = new URL(request.url).searchParams.get("id");

  // const data = [
  //   {
  //     id: 1,
  //     title: "Nike Invicible 3",
  //     price: 3890000,
  //     image:
  //       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/05101027-9c5a-4b75-b257-2e9f0627acf3/NIKE+ZOOMX+INVINCIBLE+RUN+FK+3.png",
  //   },
  //   {
  //     id: 2,
  //     title: "Nike V2K Run",
  //     price: 1690000,
  //     image:
  //       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4f323c12-a7a6-4ff3-bea2-50c26ca2ca86/W+NIKE+V2K+RUN.png",
  //   },
  //   {
  //     id: 3,
  //     title: "Nike Full Force Low",
  //     price: 1590000,
  //     image:
  //       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8f08b820-f450-4a87-b689-c7091cc88a9f/NIKE+FULL+FORCE+LO.png",
  //   },
  //   {
  //     id: 4,
  //     title: "Nike Metcon 9 AMP",
  //     price: 1990000,
  //     image:
  //       "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ba8325e8-9aec-4cd0-8f1c-fc071ed5e122/NIKE+METCON+9+AMP.png",
  //   },
  // ];
  
  // console.log(data.find((data) => data.id === Number(id)));
  // let detailData = undefined;
  if (id) {
    // const detailData = data.find((data) => data.id === Number(id));
    const detailData = await retrieveDataById("products", id);
    if (!detailData) {
      return NextResponse.json({ status: 404, message: "Not Found", data: {} });
    }
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: detailData,
    });
  }
  // return NextResponse.json({ status: 200, message: "Success", data });
  const products = await retrieveData("products");
  return NextResponse.json({ status: 200, message: "Success", data: products });
}
