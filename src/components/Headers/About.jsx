import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="relative py-20 transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left image block */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            alt="About travel"
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right text block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
            About Us
          </h3>
          <p className="text-gray-800 dark:text-gray-300 text-lg mb-4">
            Travelify is your trusted travel partner. Whether you’re looking
            for luxury resorts, backpacking adventures, or local cultural
            experiences, we bring you the best the world has to offer.
          </p>
          <p className="text-gray-800 dark:text-gray-300 text-lg">
            With curated recommendations and seamless booking, your dream
            journey is just a few clicks away.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
