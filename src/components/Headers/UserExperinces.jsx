import React from 'react'
import { motion } from "framer-motion";
export default function UserExperinces() {
  return (
    <div>
          <section
        id="unique-experiences"
        className="p-5 bg-white dark:bg-gray-900 text-black dark:text-white"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h3
            className="text-3xl font-bold mb-10 text-indigo-600 dark:text-indigo-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Unique Experiences
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Safari Adventure",
                desc: "Explore wildlife and nature in Africa’s top safari parks.",
                img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
              },
              {
                title: "City Tours",
                desc: "Walk through the historic streets of Europe’s greatest cities.",
                img: "https://images.unsplash.com/photo-1559526324-593bc073d938",
              },
              {
                title: "Island Retreat",
                desc: "Relax on pristine beaches with crystal-clear waters.",
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
              },
            ].map((exp, i) => (
              <motion.div
                key={i}
                className="rounded-lg overflow-hidden shadow-lg bg-gray-50 dark:bg-gray-800 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={exp.img}
                  alt={exp.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {exp.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exp.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
