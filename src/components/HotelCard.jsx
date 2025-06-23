// src/components/HotelCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HotelCard({ hotel, onBook }) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/hotels/${hotel.id}`}>
        <img
          src={hotel.img}
          alt={hotel.name}
          className="w-full h-48 object-cover"
        />
      </Link>

      <div className="p-5">
        <Link to={`/hotels/${hotel.id}`}>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:underline">
            {hotel.name}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-2">
          City: <span className="font-medium">{hotel.city}</span>
        </p>

        <div className="mt-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Rooms:
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
            {hotel.rooms.map((room, i) => (
              <li key={i}>
                {room.type.charAt(0).toUpperCase() + room.type.slice(1)} - ₹{room.price}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => onBook(hotel)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}
