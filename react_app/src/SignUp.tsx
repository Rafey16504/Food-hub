import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SignUp = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative SVGs */}
      <img
        src="/pizza_inverted.svg"
        alt="Pizza"
        className="absolute"
        style={{
          top: -80,
          right: -80,
          transform: "rotate(220deg)",
          width: "200px",
          height: "200px",
        }}
      />
      <img
        src="/donut_inverted.svg"
        alt="Pizza"
        className="absolute"
        style={{
          bottom: -80,
          left: -80,
          transform: "rotate(45deg)",
          width: "200px",
          height: "200px",
        }}
      />

      <div className="w-full h-full bg-white flex flex-col items-center justify-center space-y-8">
        {/* Welcome Text */}
        <div className="w-9/12 h-6/6">
          <p className="font-grotesk font-semibold text-5xl text-orange-700">
            Sign Up
          </p>
          <p className="font-grotesk text-lg text-orange-600">
            Create your account
          </p>
        </div>

        {/* Input Fields */}
        <div className="w-3/4 flex flex-col items-center space-y-8">
          <input
            type="text"
            placeholder="Name"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
          <input
            type="text"
            placeholder="University Email"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
          <div className="relative w-full flex flex-row">
            <label
              htmlFor="dob"
              className="text-gray-500 font-grotesk"
            >
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              max={currentDate}
              className="peer bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk text-gray-500"
            />
          </div>

          <input
            type="number"
            placeholder="Contact Number"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
        </div>

        {/* Sign Up Button */}
        <Link
          to="/signin"
          className="bg-orange-800 rounded-full px-16 py-3 text-white font-semibold text-lg w-3/4 text-center font-grotesk"
        >
          Sign Up
        </Link>
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-orange-700 font-semibold font-grotesk"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
