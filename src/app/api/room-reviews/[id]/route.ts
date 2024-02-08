import { getRoomReviews } from "@/app/libs/apis";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const roomId = params.id;

  try {
    const roomReview = await getRoomReviews(roomId);

    return NextResponse.json(roomReview, { status: 200, statusText: "OK" });
  } catch (error) {
    console.log("Getting room review failed: ", error);
    return new NextResponse("Unable to fetch room review", { status: 500 });
  }
}
