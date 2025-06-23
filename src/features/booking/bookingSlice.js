import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchHotels as fetchHotelsApi } from "../../api/hotelapi";

export const fetchHotels = createAsyncThunk("booking/fetchHotels", async () => {
  const data = await fetchHotelsApi();
  console.log("Async thunk data", data);

  return data;
});

const initialState = {
  step: 1,
  selectedRoomIndex: null,
  userDetails: {
    name: "",
    email: "",
  },
  hotel: null,
  bookingHistory: [],
  guests: 1,

  hotels: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.step < 4) state.step += 1;
    },
    prevStep: (state) => {
      if (state.step > 1) state.step -= 1;
    },
    resetBooking: (state) => {
      state.step = 1;
      state.selectedRoomIndex = null;
      state.userDetails = { name: "", email: "" };
      state.hotel = null;
      state.guests = 1;
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setHotel: (state, action) => {
      state.hotel = action.payload;
    },
    selectRoom: (state, action) => {
      state.selectedRoomIndex = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setGuests: (state, action) => {
      state.guests = action.payload;
    },
    saveBookingToHistory: (state) => {
      const booking = {
        hotelName: state.hotel?.name || "",
        room: state.hotel?.rooms[state.selectedRoomIndex],
        user: state.userDetails,
        guests: state.guests || 1,
        date: new Date().toISOString(),
      };
      state.bookingHistory.push(booking);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  nextStep,
  prevStep,
  resetBooking,
  setStep,
  setHotel,
  selectRoom,
  setUserDetails,
  setGuests,
  saveBookingToHistory,
} = bookingSlice.actions;

export default bookingSlice.reducer;
