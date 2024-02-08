export type UpdateReviewDto = {
  reviewId: string;
  reviewText: string;
  userRating: number;
};

export type CreateReviewDto = {
  userId: string;
  hotelRoomId: string;
  reviewText: string;
  userRating: number;
};

export type Review = {
  _id: string;
  reviewText: string;
  createdAt: Date;
  user: {
    name: string;
  };
  userRating: number;
};
