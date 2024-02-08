// "use client";

import { Dispatch, FC, SetStateAction } from "react";
import { BsStarFill } from "react-icons/bs";

type Props = {
    isOpen: boolean;
    ratingValue: number | null;
    setRatingValue: Dispatch<SetStateAction<number | null>>;
    ratingText: string;
    setRatingText: Dispatch<SetStateAction<string>>;
    reviewSunmitHandler: () => Promise<string | undefined>;
    isSubmittingReview: boolean;
    toggleRatingModal: () => void;
};
const RatingModal: FC<Props> = (props) => {
  const {
    isOpen,
    ratingValue,
    setRatingValue,
    ratingText,
    setRatingText,
    isSubmittingReview,
    reviewSunmitHandler,
    toggleRatingModal,
  } = props;

  const starValue = [1, 2, 3, 4, 5];

  return (
    <div
      className={`fixed z-[61] inset-0 flex items-center justify-center ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl dark:text-gray-800 font-semibold mb-2">
          Rate Your Experience
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex items-center">
            {starValue.map((value) => (
              <button
                key={value}
                className={`w-6 h-6 ${
                  ratingValue === value ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRatingValue(value)}
              >
                <BsStarFill />
              </button>
            ))}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Review Text
            </label>
            <textarea
              value={ratingText}
              onChange={(e) => setRatingText(e.target.value)}
              className="w-full h-24 px-2 py-3 border border-gray-300 rounded-lg"
              placeholder="Write your review here"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={reviewSunmitHandler}
            disabled={isSubmittingReview}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            {isSubmittingReview ? "Submitting..." : "Submit"}
          </button>
          <button
            onClick={toggleRatingModal}
            className="text-gray-700 bg-gray-300 hover:bg-gray-400 font-medium ml-2 px-4 py-2 rounded-md "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
