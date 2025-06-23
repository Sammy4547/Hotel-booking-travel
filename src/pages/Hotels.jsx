import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // 🔥
import { fetchHotels } from "../features/booking/bookingSlice"; // 🔥 asyncThunk from Redux slice

import HotelCard from "../components/HotelCard";
import BookingStepper from "./BookingStepper";


export default function HotelsPage() {
  const dispatch = useDispatch();
  const { hotels, loading, error } = useSelector((state) => state.booking); // Redux state
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    dispatch(fetchHotels()); 
  }, [dispatch]);


   return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Explore Our Hotels
      </h1>

      {loading && (
        <p className="text-center text-lg text-gray-500 dark:text-gray-300">
          Loading hotels...
        </p>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg">
          Failed to load hotels: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
          {hotels.flatMap((city) =>
            city.hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={{ ...hotel, city: city.city }}
                onBook={setSelectedHotel}
              />
            ))
          )}
        </div>
      )}

      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedHotel(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
              Booking: {selectedHotel.name}
            </h2>
            <BookingStepper hotel={selectedHotel} />
          </div>
        </div>
      )}
    </div>
  );
}


