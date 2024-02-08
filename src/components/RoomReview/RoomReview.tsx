import { Review } from "@/models/review";
import axios from "axios";
import { FC } from "react";
import useSWR from "swr";
import Rating from "../Rating/Rating";

const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {
  const fetchRoomReview = async () => {
    const { data } = await axios.get<Review[]>(`/api/room-reviews/${roomId}`);
    return data;
  };

  const {
    data: roomReview,
    error,
    isLoading,
  } = useSWR(`/api/room-reviews`, fetchRoomReview);

  if (error) throw new Error("Cannot fetch data");
  if (typeof roomReview === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  return (
    <>
      {roomReview &&
        roomReview.map((review) => (
          <div
            key={review._id}
            className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
          >
            <div className="font-semibold mb-2 flex">
              <p>{review.user.name}</p>
              <div className="ml-4 flex items-center text-tertiary-light text-lg">
                <Rating rating={review.userRating} />
              </div>
            </div>
            <p>{review.reviewText}</p>
          </div>
        ))}
    </>
  );
};

export default RoomReview;
