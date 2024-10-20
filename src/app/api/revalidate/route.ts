import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!tag) {
    return NextResponse.json({
      status: 400,
      message: "Missing tag param!",
    });
  }

  if (!secret) {
    return NextResponse.json({
      status: 400,
      message: "Token required!",
    });
  }
  
  if (secret !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({
      status: 401,
      message: "Token not valid!",
    });
  }

  revalidateTag(tag);

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: "Revalidate successfully!"
  });
}
