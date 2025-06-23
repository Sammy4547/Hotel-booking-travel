import React from "react";
import { useSelector } from "react-redux";

export default function Stepper() {
  const step = useSelector((state) => state.booking.step);
  const steps = ["1. Select Room", "2. Your Details", "3. Payment", "4. Confirm"];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div key={label} className="flex flex-col items-center text-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300
                ${isCompleted ? "bg-green-500 border-green-500 text-white"
                  : isActive ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-gray-700 border-gray-700 text-gray-800"}`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span className="text-xs mt-2 text-gray-700 whitespace-nowrap">{label}</span>
            </div>
          );
        })}
      </div>
  );
}