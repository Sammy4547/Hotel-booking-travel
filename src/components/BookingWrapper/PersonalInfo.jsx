import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserDetails,
  nextStep,
  prevStep,
  setGuests,
} from "../../features/booking/bookingSlice";

export default function PersonalInfo() {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.booking.userDetails);
  const guestsCount = useSelector((state) => state.booking.guests) || 1;

  const formik = useFormik({
    initialValues: {
      name: userDetails.name || "",
      email: userDetails.email || "",
      guests: guestsCount,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      guests: Yup.number()
        .min(1, "At least 1 guest")
        .max(10, "Too many guests")
        .required("Guests required"),
    }),
    onSubmit: (values) => {
      dispatch(setUserDetails({ name: values.name, email: values.email }));
      dispatch(setGuests(values.guests));
      dispatch(nextStep());
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-6 text-gray-800"
    >
      <h2 className="text-2xl font-semibold text-center">Enter Your Details</h2>

      {/* Name Field */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Guests Field */}
      <div>
        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.guests}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formik.touched.guests && formik.errors.guests && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.guests}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => dispatch(prevStep())}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
}
