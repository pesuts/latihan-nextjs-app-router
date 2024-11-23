import { register } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { status, message } = await register(req);
  if (status) {
    return NextResponse.json({ status, message }, { status: 200 });
  } else {
    return NextResponse.json({ status, message }, { status: 400 });
  }
}
