import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHotels,
  setHotel,
} from "../features/booking/bookingSlice";

import BookingStepper from "../components/BookingWrapper/Stepper";
import RoomSelection from "../components/BookingWrapper/RoomSelection";
import PersonalInfo from "../components/BookingWrapper/PersonalInfo";
import Payment from "../components/BookingWrapper/Payment";
import Confirmation from "../components/BookingWrapper/Confirmation";

export default function BookingPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const step = useSelector((state) => state.booking.step);
  const hotel = useSelector((state) => state.booking.hotel);
  const hotels = useSelector((state) => state.booking.hotels);
  const loading = useSelector((state) => state.booking.loading);
  const error = useSelector((state) => state.booking.error);

  useEffect(() => {
    // Fetch if not already
    if (hotels.length === 0) {
      dispatch(fetchHotels());
    }
  }, [dispatch, hotels.length]);

  useEffect(() => {
    if (hotels.length > 0 && id) {
      const allHotels = hotels.flatMap((city) => city.hotels);
      const selectedHotel = allHotels.find((h) => String(h.id) === id);
      if (selectedHotel) {
        dispatch(setHotel(selectedHotel));
      }
    }
  }, [hotels, id, dispatch]);

  if (loading || !hotel) {
    return (
      <div className="p-6 text-center text-gray-600">
        <span className="text-lg">Loading hotel...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <span className="text-lg">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-md space-y-6 h-screen w-full">
      <h2 className="text-3xl font-bold text-white">
        Booking: <span className="text-indigo-600">{hotel.name}</span>
      </h2>

      <div className="border-t pt-6">
        <BookingStepper step={step} hotel={hotel} />

        <div className="mt-8">
          {step === 1 && <RoomSelection hotel={hotel} />}
          {step === 2 && <PersonalInfo />}
          {step === 3 && <Payment hotel={hotel} />}
          {step === 4 && <Confirmation hotel={hotel} />}
          {(step < 1 || step > 4) && (
            <p className="text-gray-800 text-center mt-6">
              Invalid booking step.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
