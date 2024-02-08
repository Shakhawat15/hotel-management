"use client";

import { getRoom } from "@/app/libs/apis";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelPhotoGallerry from "@/components/HotelPhotoGallerry/HotelPhotoGallerry";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCta from "@/components/BookRoomCta/BookRoomCta";
import { useState } from "react";
import toast from "react-hot-toast";
import { Image } from "@/models/room";
import axios from "axios";
import { get } from "lodash";
import { getStripe } from "@/app/libs/stripe";
import RoomReview from "@/components/RoomReview/RoomReview";

const RoomDetails = (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAults] = useState(1);
  const [noOfchildren, setNoOfchildren] = useState(0);

  const fetchRoom = async () => getRoom(slug);
  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoom);

  if (error) throw new Error("Cannot fetch data");
  if (typeof room === "undefined" && !isLoading)
    throw new Error("Cannot fetch data");

  if (!room) return <LoadingSpinner />;

  const calcMinCheckOutDate = () => {
    if (checkInDate) {
      const nextDay = new Date(checkInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      return nextDay;
    }
    return null;
  };

  const handleBookNowClick = async () => {
    if (!checkInDate || !checkOutDate)
      return toast.error("Please provide checkin / checkout date");

    if (checkInDate > checkOutDate)
      return toast.error("Please choose a valid checkin priod");

    const numberOfDays = calcNoOfDays();

    const hotelRoomSlug = room.slug.current;

    // Integrate Stripe

    const stripe = await getStripe();

    try {
      const { data: stripeSession } = await axios.post("/api/stripe", {
        checkinDate: checkOutDate,
        checkoutDate: checkInDate,
        hotelRoomSlug,
        numberOfDays,
        adults,
        children: noOfchildren,
      });

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Payment failed");
        }
      }
    } catch (error) {
      console.log("Stripe error", error);
      toast.error(
        "An error occured while processing your payment. Please try again later."
      );
    }
  };

  const calcNoOfDays = () => {
    if (!checkInDate || !checkOutDate) return;

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const noOfDays = Math.ceil(timeDiff / (24 * 60 * 60 * 1000));
    return noOfDays;
  };

  return (
    <div>
      <HotelPhotoGallerry
        photos={Array.isArray(room.images) ? room.images : []}
      />
      <div className=" container mx-auto mt-20">
        <div className=" md:grid md:grid-cols-12 gap-10 px-3">
          <div className=" md:col-span-8 md:w-full">
            {/* Hotel Information */}
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl">
                {room.name} ({room.dimention})
              </h2>
              <div className="flex my-11">
                {room?.offeredAmenities?.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="md:w-44 w-fit text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#EFF0F2] dark:bg-gray-800 rounded-lg grid place-content-center "
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                    <p className="text-xs md:text-base pt-3">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              {/* Description  */}
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Description</h2>
                <p>{room.description}</p>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Offerred Amenities</h2>
                <div className="grid grid-cols-2">
                  {room?.offeredAmenities?.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="flex items-center md:my-0 my-1"
                    >
                      <i className={`fa-solid ${amenity.icon}`}></i>
                      <p className="text-xs md:text-base ml-2">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Safety and Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-sm">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 md:text-base text-sm">
                      Fire Exxtinguishers
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 md:text-base text-sm">
                      Disinfections and Sterializations
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 md:text-base text-sm">Smoke Detectors</p>
                  </div>
                </div>
              </div>
              {/* Reviews */}
              <div className="shadow dark:shadow-white rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">Customer Reviews</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RoomReview roomId={room._id} />
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow-white sticky top-10 h-fit overflow-auto">
            {/* Book Room CTA  */}
            <BookRoomCta
              discount={room.discount}
              price={room.price}
              specialNote={room.specialNote}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              calcMinCheckOutDate={calcMinCheckOutDate}
              adults={adults}
              setAdults={setAults}
              noOfchildren={noOfchildren}
              setNoOfchildren={setNoOfchildren}
              isBooked={room.isBooked}
              handleBookNowClick={handleBookNowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
