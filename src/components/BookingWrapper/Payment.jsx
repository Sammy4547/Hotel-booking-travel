import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../../features/booking/bookingSlice";

export default function Payment({ hotel }) {
  const dispatch = useDispatch();
  const selectedRoomIndex = useSelector((state) => state.booking.selectedRoomIndex);
  const room = hotel?.rooms?.[selectedRoomIndex];

  if (!room) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center text-red-600 space-y-4">
        <h2 className="text-xl font-semibold">Room not found</h2>
        <p>Please go back and select a valid room.</p>
        <button
          onClick={() => dispatch(prevStep())}
          className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center space-y-6 text-gray-800">
      <h2 className="text-2xl font-semibold">Payment for Booking</h2>
      <p className="text-gray-600">
        You're about to book a <span className="font-medium">{room.type}</span> room at{" "}
        <span className="text-blue-600 font-semibold">{hotel.name}</span>.
      </p>
      <p className="text-lg font-bold text-gray-800">Amount: ₹{room.price}</p>
      <p className="text-gray-500">Click below to simulate a successful payment.</p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
        <button
          onClick={() => dispatch(nextStep())}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Pay ₹{room.price} Now
        </button>
        <button
          onClick={() => dispatch(prevStep())}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
