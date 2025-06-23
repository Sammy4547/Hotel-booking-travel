import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchHotels } from "../../features/booking/bookingSlice";
import { Autocomplete, TextField, Button, Box } from "@mui/material";

export default function Hero() {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { hotels } = useSelector((state) => state.booking);

  useEffect(() => {
    if (hotels.length === 0) {
      dispatch(fetchHotels());
    } else {
      const cityList = hotels.map((c) => c.city);
      setCities(cityList);
    }
  }, [hotels, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query.trim().toLowerCase()}`);
    }
  };

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat transition-colors duration-300"
      style={{
        backgroundImage:
          "url('https://digital.ihg.com/is/image/ihg/ihgor-member-rate-web-offers-1440x720?fit=crop,1&wid=1440&hei=720')",
      }}
    >
      <div className="absolute inset-0 bg-white/80 dark:bg-black/60 transition-colors duration-300" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 text-gray-900 dark:text-white">
            Plan Your Perfect Booking{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Hotels</span>
          </h2>
          <p className="text-gray-800 dark:text-gray-200 mb-6 text-lg">
            Discover world-class destinations, curated experiences, and the best hotel stays – all in one place.
          </p>

          <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 1, maxWidth: 500 }}>
            <Autocomplete
              freeSolo
              options={cities}
              value={query}
              onInputChange={(e, newInputValue) => setQuery(newInputValue)}
              onChange={(e, selectedValue) => {
                if (selectedValue) {
                  setQuery(selectedValue);
                  navigate(`/search/${selectedValue.toLowerCase()}`);
                }
              }}
              sx={{ flexGrow: 1 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search destinations"
                  variant="outlined"
                  fullWidth
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ px: 3 }}
            >
              Search
            </Button>
          </Box>
        </motion.div>
      </div>
    </section>
  );
}
