import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHotels } from "../features/booking/bookingSlice";

import { Link, useParams, useSearchParams } from "react-router-dom";

export default function SearchResults() {
  const { city } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

const { hotels, loading, error } = useSelector((state) => state.booking);

  const bedType = searchParams.get("bedType");

  useEffect(() => {
    if (hotels.length === 0) {
      dispatch(fetchHotels());
    }
  }, [dispatch, hotels.length]);

  const filteredHotels = useMemo(() => {
    const cityData = hotels.find(
      (c) => c.city.toLowerCase() === city?.toLowerCase()
    );

    if (!cityData) return [];

   return cityData.hotels
  .map((hotel) => {
    const matchedRooms = hotel.rooms.filter(
      (room) =>
        (!bedType || room.bedType == bedType) 
    );
    return matchedRooms.length > 0
      ? { ...hotel, rooms: matchedRooms }
      : null;
  })
  .filter(Boolean);

  }, [hotels, city, bedType]);

  if (loading) return <p className="p-6">Loading hotels...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {city ? `Hotels in ${city}` : "Search Results"}
      </h1>

      {filteredHotels.length === 0 ? (
        <p className="text-gray-500 text-lg">
          No hotels found matching your filters.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              <img
                src={hotel.img}
                alt={hotel.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {hotel.name}
                </h2>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Filtered Rooms:</span>{" "}
                  {hotel.rooms.map((room) => room.type).join(", ")}
                </p>
                <ul className="text-sm text-gray-900 list-disc list-inside">
                  {hotel.rooms.map((room, i) => (
                    <li key={i}>
                      {room.type.charAt(0).toUpperCase() + room.type.slice(1)} –{" "}
                      {room.bedType}, ₹{room.price}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/booking/${hotel.id}`}
                  className="inline-block mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
