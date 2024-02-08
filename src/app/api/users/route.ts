import {
  checkReviewExitis,
  createReview,
  getUserData,
  updateReview,
} from "@/app/libs/apis";
import { authOptions } from "@/app/libs/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Response, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Authentication required", { status: 401 });
  }

  const userId = session.user.id;

  try {
    const data = await getUserData(userId);
    console.log("data", data);
    return NextResponse.json(data, { status: 200, statusText: "Successfull" });
  } catch (error) {
    return new NextResponse("Unable to fetch", { status: 400 });
  }
}

export async function POST(req: Request, res: Response) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Authentication required", { status: 401 });
  }

  const { roomId, reviweText, ratingValue } = await req.json();

  if (!roomId || !reviweText || !ratingValue) {
    return new NextResponse("Invalid data", { status: 400 });
  }
  const userId = session.user.id;

  try {
    // Check if review already exists
    const alreadyExists = await checkReviewExitis(userId, roomId);

    let data;

    if (alreadyExists) {
      // Update review
      data = await updateReview({
        reviewId: alreadyExists._id,
        reviewText: reviweText,
        userRating: ratingValue,
      });
    } else {
      // Create new review
      data = await createReview({
        userId,
        hotelRoomId: roomId,
        reviewText: reviweText,
        userRating: ratingValue,
      });
    }
    return NextResponse.json(data, { status: 200, statusText: "Successfull" });
  } catch (error: any) {
    console.log("Error Updating", error);
    return new NextResponse("Unable to fetch", { status: 400 });
  }
}
