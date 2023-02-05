import React, { useState } from "react";
import { Link } from "react-router-dom";
import Flex from "../components/Flex";
import InputBox from "../components/InputBox";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const validate = () => {
    let emailError = "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!email) {
      emailError = " Email address is required";
    } else {
      if (!email.match(mailformat)) {
        emailError = "Invalid email address";
      }
    }

    if (emailError) {
      setEmailError(emailError);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setEmail("");
    }
  };
  return (
    <section class=" p-5 flex  mx-auto justify-center items-center h-screen">
      <Flex className="flex-col w-[500px] bg-[#F7F9FB] p-10 rounded-lg">
        <h2 className="font-bold font-nunito text-2xl text-[#181818] mb-8">
          Reset Your Password
        </h2>
        <InputBox
          type="email"
          label="Email Address"
          onChange={handleEmail}
          value={email}
        />
        {emailError && (
          <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">{emailError}</p>
        )}
        <div>
          <button
            onClick={handleSubmit}
            className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold  py-3 px-6 rounded-full inline-block mr-5"
          >
            Reset Password
          </button>
          <Link
            to="/"
            className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold  py-3 px-6 rounded-full inline-block"
          >
            Back to Login
          </Link>
        </div>
      </Flex>
    </section>
  );
};

export default ForgotPassword;
