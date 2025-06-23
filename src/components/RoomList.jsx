// src/pages/Hotels.jsx
import React, { useEffect, useState } from "react";
import { fetchHotels } from "../api/hotelapi";
import HotelCard from "../components/HotelCard";

export default function RoomList() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels().then((data) => {
      const allHotels = data.flatMap((city) =>
        city.hotels.map((hotel) => ({
          ...hotel,
          city: city.city, // add city to hotel
        }))
      );
      setHotels(allHotels);
    });
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Explore Our Hotels
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
