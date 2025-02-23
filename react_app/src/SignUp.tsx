import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { set, setDate } from "date-fns";

const SignUp = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString().split("T")[0]);
  const [id, setID] = useState("")
  const [verificationCode, setVerificationCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const location = useLocation();
  const { loggedInAccount } = location.state || {};
  const [isVerificationVisible, setIsVerificationVisible] = useState(false);
  const [accounts, setAccounts] = useState<{ [name: string]: string }>(
    () => {
      const storedAccounts = localStorage.getItem("accounts");
      return storedAccounts ? JSON.parse(storedAccounts) : {};
    }
  );
  const [signUpMessage, setSignUpMessage] = useState("");
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  const signUp = async () => {
    if (verificationCode) {
      setInputCode("");
      setIsVerificationVisible(false);
    }
  
    if (name && password && email && dateOfBirth && contactNumber) {
      try {
        const { data } = await axios.post("http://localhost:8000/sign-up", {
          name, 
          pass: password,
          email,
          date_of_birth: dateOfBirth,
          phone_number: contactNumber,  
        });
  
        if (data.error) {
          setSignUpMessage(data.error);
          setID("");
        } else {
          setSignUpMessage("Please wait for Verification");
          setID(data.id);
  
          const response = await axios.post(`http://localhost:8000/send-email/${data.id}`, { email });
  
          if (response.data.error) {
            setSignUpMessage(response.data.error);
          } else {
            setIsVerificationVisible(true);
            setInputCode("");
            console.log("Email sent successfully!");
            setSignUpMessage("Please check your email for the verification code!");
  
            if (response.data.code) {
              console.log("Received Code:", response.data.code);
              setVerificationCode(response.data.code);
            }
          }
        }
      } catch (error: any) {
        if (error.response) {
          setSignUpMessage(error.response.data.error || "Something went wrong.");
        } else if (error.request) {
          setSignUpMessage("Network error. Please try again.");
        } else {
          setSignUpMessage("An unknown error occurred.");
        }
        console.error("Error signing up:", error);
      }
    } else {
      setSignUpMessage("Please fill all credentials!");
    }
  
    setTimeout(() => {
      setSignUpMessage("");
    }, 2000);
  };
  

  const add_account = async (name: any, password: any,email:any,dateOfBirth:any,contactNumber:any) => {
    try {
        if (inputCode === verificationCode) {
          setAccounts((prevUsers) => ({
            ...prevUsers,
            [name]: password,
          }));
          
          setSignUpMessage("Your Account has been verified.");
          setIsVerificationVisible(false);
          const { data } = await axios.post(
            `http://localhost:8000/adduser`,
            {
              id: id,
              name: name,
              pass: password,
              email: email,
              date_of_birth: dateOfBirth,
              contact_no: contactNumber
            }
          );
          setName("");
          setPassword("");
          // setEmail("");
          setContactNumber("");
          setDateOfBirth("");
          setID("")
        } else {
          setSignUpMessage("Wrong Verification Code!");
        }
        setTimeout(() => {
          setSignUpMessage("");
        }, 2000);
           
    } catch (error) {
      console.log("Account does not exist!", error);
    }
  };

  
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
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
          <input
            type="text"
            placeholder="University Email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="peer bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk text-gray-500"
            />
          </div>

          <input
            type="number"
            placeholder="Contact Number"
            onChange={(e) => setContactNumber(e.target.value)}
            className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
          />
          <div className="relative w-full flex flex-col">
  {isVerificationVisible && (
    <div className="flex items-center w-full">
      <input
        type="text"
        placeholder="Verification Code"
        value={inputCode}
        className="bg-transparent border-b-2 border-gray-200 focus:outline-none focus:border-orange-500 w-full pb-2 font-grotesk"
        onChange={(e) => setInputCode(e.target.value)}
      />
      <button
        className="font-grotesk ml-2 px-4 py-2 bg-orange-800 text-white rounded-lg"
        onClick={() => {
          add_account(name, password, email, dateOfBirth, contactNumber);
        }}
      >
        Verify
      </button>
    </div>
  )}
</div>

        </div>
        
        <button
        className="bg-orange-800 rounded-full px-16 py-3 text-white font-semibold text-lg w-3/4 text-center font-grotesk"
            onClick={async () => {
              await signUp();
            }}
          >
            Sign Up
          </button>
          {signUpMessage && <div className="font-grotesk text-orange-500">{signUpMessage}</div>}
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
