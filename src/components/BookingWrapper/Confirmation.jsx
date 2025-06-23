import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetBooking } from "../../features/booking/bookingSlice";

export default function Confirmation({ hotel }) {
  const dispatch = useDispatch();

  const selectedRoomIndex = useSelector((state) => state.booking.selectedRoomIndex);
  const userDetails = useSelector((state) => state.booking.userDetails);

  const room = hotel.rooms[selectedRoomIndex];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow-md text-center space-y-6 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
        🎉 Booking Confirmed!
      </h2>

      <div className="text-lg leading-relaxed space-y-2">
        <p>
          Thank you, <span className="font-semibold">{userDetails.name}</span>!
        </p>
        <p>
          Your booking at{" "}
          <span className="text-blue-600 font-semibold">{hotel.name}</span> is confirmed.
        </p>
        <p>
          <span className="font-medium">Room Type:</span> {room.type}
        </p>
        <p>
          <span className="font-medium">Bed Type:</span> {room.bedType}
        </p>
        <p>
          <span className="font-medium">Guests:</span>{" "}
          {userDetails.guests && userDetails.guests.length > 0 ? (
            <ul className="list-disc list-inside text-left pl-4">
              {userDetails.guests.map((guest, i) => (
                <li key={i}>
                  {guest.name} ({guest.age} yrs)
                </li>
              ))}
            </ul>
          ) : (
            "1"
          )}
        </p>
        <p>
          <span className="font-medium">Email:</span> {userDetails.email}
        </p>
      </div>

      <button
        onClick={() => dispatch(resetBooking())}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
      >
        Book Another
      </button>
    </div>
  );
}
