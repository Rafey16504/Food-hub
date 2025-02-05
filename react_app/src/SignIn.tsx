import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center relative overflow-hidden">
      {/* Pizza Images in 4 Corners */}
      {/* <img
        src="/pizza.png"
        alt="Pizza"
        className="absolute"
        style={{
          top: 0,
          left: 0,
          transform: "rotate(135deg)",
          width: "50px",
          height: "50px",
          
        }}
      /> */}
      <img
        src="/pizza.svg"
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
        src="/donut.svg"
        alt="Pizza"
        className="absolute"
        style={{
          bottom: -60,
          left: -60,
          transform: "rotate(45deg)",
          width: "200px",
          height: "200px",
        }}
      />
      {/* <img
        src="/pizza.png"
        alt="Pizza"
        className="absolute"
        style={{
          bottom: 0,
          right: 0,
          transform: "translate(0, 0)",
          width: "50px",
          height: "50px",
        }}
      /> */}

      <div className="w-full h-full bg-white flex flex-col items-center justify-center space-y-8">
        {/* Welcome Text */}
        <div className="w-9/12 h-1/6 -mt-20">
          <p className="font-grotesk font-semibold text-5xl text-orange-700">
            Welcome
          </p>
          <p className="font-grotesk text-lg text-orange-600">
            Login to your account
          </p>
        </div>

        {/* Input Fields */}
        <div className="w-3/4 flex flex-col items-center space-y-12">
          <input
            type="text"
            placeholder="Email"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
        </div>

        {/* Sign In Button */}
        <Link
          to="/"
          className="bg-orange-800  rounded-full px-16 py-3 text-white font-semibold text-lg w-3/4 text-center font-grotesk"
        >
          Sign in
        </Link>
        <p className="text-center text-gray-400">
          Create Account?{" "}
          <Link to="/signup" className="text-orange-700 font-semibold font-grotesk">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
