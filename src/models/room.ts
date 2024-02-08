type CoverImage = {
  url: string;
};
export type Image = {
  _key: string;
  url: string;
};
type Amenity = {
  _key: string;
  amenity: string;
  icon: string;
};
type Slug = {
  _key: string;
  current: string;
};
export type Room = {
  _id: string;
  coverImage: CoverImage;
  description: string;
  dimention: string;
  images: Image;
  isBooked: boolean;
  isFeatured: boolean;
  name: string;
  numberOfBed: number;
  offeredAmenities: Amenity[];
  price: number;
  discount: number;
  slug: Slug;
  specialNote: string;
  roomType: string;
};

export type CreateBookingDto = {
  user: string;
  hotelRoom: string;
  checkinDate: string;
  checkoutDate: string;
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};
