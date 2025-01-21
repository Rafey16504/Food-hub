import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [selectedProfession, setSelectedProfession] = useState("");

  const handleChange = (e: any) => {
    setSelectedProfession(e.target.value);
  };

  useEffect(() => {

    setSelectedProfession("");
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full h-full bg-white flex flex-col items-center justify-center space-y-8">
        {/* Welcome Text */}
        <div className="w-9/12 h-1/6 -mt-20">
          <p className="font-grotesk font-semibold text-5xl text-green-700">
            Welcome
          </p>
          <p className="font-grotesk text-lg text-green-600">
            Login to your account
          </p>
        </div>

        {/* Input Fields */}
        <div className="w-3/4 flex flex-col items-center space-y-12">
          <input
            type="text"
            placeholder="Email"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-green-500 w-full pb-2 font-grotesk"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-green-500 w-full pb-2 font-grotesk"
          />
        </div>

        {/* Sign In Button */}
        <Link
          to="/"
          className="bg-green-800 hover:bg-emerald-300 rounded-full px-16 py-3 text-white font-semibold text-lg w-3/4 text-center font-grotesk"
        >
          Sign in
        </Link>
        <p className="text-center text-gray-400">
                      Create Account?{" "}
                      <Link to="/signin" className="text-green-700 font-semibold font-grotesk">
                        Sign up
                      </Link>
                    </p>  
      </div>
    </div>
  );
};

export default SignIn;
