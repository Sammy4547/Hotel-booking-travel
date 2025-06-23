import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../features/booking/bookingSlice";
import BookingStepper from "./BookingStepper";
import { motion, AnimatePresence } from "framer-motion";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotels, loading, error } = useSelector((state) => state.booking);
  const [hotel, setHotel] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    if (hotels.length === 0) {
      dispatch(fetchHotels());
    }
  }, [dispatch, hotels.length]);

  useEffect(() => {
    if (hotels.length > 0) {
      const allHotels = hotels.flatMap((city) =>
        city.hotels.map((hotel) => ({
          ...hotel,
          city: city.city,
        }))
      );
      const selected = allHotels.find((h) => h.id.toString() === id);
      setHotel(selected);
    }
  }, [hotels, id]);

  if (loading || !hotel) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading hotel: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/hotels")}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md text-sm shadow-sm transition-all duration-200"
        >
          ← Back to Hotels
        </button>

        {/* Hotel Info */}
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          {hotel.name}
        </h1>

        <img
          src={hotel.img}
          alt={hotel.name}
          className="w-full h-64 object-cover rounded-md shadow mb-6"
        />

        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            📍 <strong>City:</strong> {hotel.city}
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              🛏️ Available Rooms:
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {hotel.rooms.map((room, i) => (
                <li key={i} className="ml-4">
                  <span className="font-medium capitalize">{room.type}</span> –{" "}
                  {room.bedType} bed – ₹{room.price}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Book Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowBooking(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow transition-all duration-300"
          >
            Book Now
          </button>
        </div>

        {/* Booking Modal */}
        <AnimatePresence>
          {showBooking && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4"
            >
              <motion.div
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6"
              >
                <button
                  onClick={() => setShowBooking(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
                  Booking: {hotel.name}
                </h2>
                <BookingStepper hotel={hotel} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
