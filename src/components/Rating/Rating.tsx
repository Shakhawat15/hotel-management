import { FC } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.ceil(rating - fullStars);

  const fullStarElement = Array(fullStars).fill(<FaStar />);
  let halfStarElement = null;
  if (halfStars) {
    halfStarElement = <FaStarHalf />;
  }
  return (
    <>
      {fullStarElement}
      {halfStarElement}{" "}
    </>
  );
};

export default Rating;
