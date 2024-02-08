export type Booking = {
  _id: string;
  checkinDate: string;
  checkoutDate: string;
  hotelRoom: {
    _id: string;
    name: string;
    price: number;
    slug: { current: string };
  };
  numberOfDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};
