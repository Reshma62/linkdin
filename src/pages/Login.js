import React from "react";
import Flex from "../components/Flex";
import Images from "../components/Images";
import InputBox from "../components/InputBox";

const Login = () => {
  return (
    <Flex className="justify-center items-center h-screen">
      <div className="w-[500px]">
        <div className="text-center">
          <Images className="mx-auto" imgsrc="assets/logo.png" />
        </div>
        <div className="mb-16 text-center mt-11">
          <h2 className="font-bold font-nunito text-sec text-[34px]">Login</h2>
          <p className="font-normal font-nunito text-sec/50 text-xl">
            Free register and you can enjoy it{" "}
          </p>
        </div>
        <InputBox type="text" label="Email Address" />
        <InputBox type="text" label="Password" />
        <button className="bg-primary text-white text-xl font-nunito font-semibold w-full py-5 rounded-full">
          Sign In
        </button>
      </div>
    </Flex>
  );
};

export default Login;
