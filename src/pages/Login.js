import React from "react";
import Flex from "../components/Flex";
import Images from "../components/Images";
import InputBox from "../components/InputBox";

const Login = () => {
  return (
    <Flex className="justify-center items-center h-screen max-sm:mx-5 max-sm:mt-10 sm:max-md:mt-[150px]">
      <div className="w-[500px] lg:max-xl:pb-5 lg:max-xl:mt-16">
        <div className="text-center sm:max-md:mt-10">
          <Images className="mx-auto" imgsrc="assets/logo.png" />
        </div>
        <div className=" lg:max-xl:mt-5 lg:max-xl:mb-10 mb-16 max-sm:mb-6 max-sm:mt-6 text-center mt-11 sm:max-md:my-5 sm:max-md:mb-8">
          <h2 className=" lg:max-xl:mt-5 font-bold font-nunito text-sec text-[34px] max-sm:text-3xl">
            Login
          </h2>
          <p className="font-normal font-nunito text-sec/50 text-xl max-sm:text-base max-sm:mt-3">
            Free register and you can enjoy it
          </p>
        </div>
        <InputBox type="text" label="Email Address" />
        <InputBox type="text" label="Password" />
        <button className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full py-5 rounded-full">
          Sign In
        </button>
        <p className="text-center my-5">
          Don't Have Account ?{" "}
          <span className="text-primary font-bold font-nunito ">Sign Up</span>
        </p>
      </div>
    </Flex>
  );
};

export default Login;
