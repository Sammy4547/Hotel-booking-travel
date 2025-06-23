import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setHotel,
  saveBookingToHistory,
} from "../features/booking/bookingSlice";
import { useLocalStorage } from "../hooks/useLocalStrorage";

import RoomSelection from "../components/BookingWrapper/RoomSelection";
import PersonalInfo from "../components/BookingWrapper/PersonalInfo";
import Payment from "../components/BookingWrapper/Payment";
import Confirmation from "../components/BookingWrapper/Confirmation";
import Stepper from "../components/BookingWrapper/Stepper";

export default function BookingStepper({ hotel }) {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.booking.step);
  const bookingHistory = useSelector((state) => state.booking.bookingHistory);
  const [storedHistory, setStoredHistory] = useLocalStorage(
    "bookingHistory",
    []
  );

  useEffect(() => {
    if (Array.isArray(bookingHistory)) {
      setStoredHistory(bookingHistory);
    }
  }, [bookingHistory]);

  useEffect(() => {
    if (hotel) {
      dispatch(setHotel(hotel));
    }
  }, [hotel]);

  useEffect(() => {
    if (step === 4) {
      dispatch(saveBookingToHistory());
    }
  }, [step]);

  return (
    <div className="space-y-6">
      {/* Stepper UI */}
      <Stepper />

      {/* Step-specific content */}
      <div className="relative min-h-[250px] overflow-hidden bg-white rounded-xl shadow p-4">
        {step === 1 && <RoomSelection hotel={hotel} />}
        {step === 2 && <PersonalInfo />}
        {step === 3 && <Payment hotel={hotel} />}
        {step === 4 && <Confirmation hotel={hotel} />}
        {(step < 1 || step > 4) && (
          <p className="text-center text-gray-500">Invalid booking step.</p>
        )}
      </div>
    </div>
  );
}
