import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" &&  isFeatured == true][0]{
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage,
}`;

export const getRoomsQuery = groq`*[_type == "hotelRoom"]{
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage,
    dimention,
    roomType,
    isBooked
}`;

export const getRooms = groq`*[_type == "hotelRoom" && slug.current == $slug][0]{
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage,
    dimention,
    roomType,
    offeredAmenities,
    specialNote,
    isBooked
}`;

export const getUserBookingsQuery = groq`*[_type == "booking" && user._ref == $userId]{
    _id,
    checkinDate,
    checkoutDate,
    hotelRoom->{
        _id,
        name,
        price,
        slug
    },
    numberOfDays,
    adults,
    children,
    totalPrice,
    discount
}`;

export const getUserDataQuery = groq`*[_type == "user" && _id == $userId][0]{
    _id,
    email,
    name,
    isAdmin,
    about,
    image,
    createdAt,
}`;

export const checkReviewExistsQuery = groq`*[_type == "review" && hotelRoom._ref == $roomId && user._ref == $userId][0]{
    _id
}`;

export const getRoomReviewsQuery = groq`*[_type == "review" && hotelRoom._ref == $roomId]{
    _id,
    reviewText,
    createdAt,
    user->{
        name,
    },
    userRating
}`;
