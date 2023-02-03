import React from "react";
import Flex from "../components/Flex";
import Header from "../components/Header";
import { FiImage } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
const Home = () => {
  return (
    <div className="bg-[#F7F9FB]">
      <Header show={false} />
      <div className="container mx-auto mt-10 ">
        <Flex className="gap-x-10">
          <div className="w-3/4 ">
            <div className="bg-white p-8 rounded-md shadow-lg relative mb-9">
              <p className="text-[#181818] uppercase font-medium font-nunito text-base border-b border-solid border-red-500 pb-4 mb-8">
                new post
              </p>
              <input
                className="w-full outline-none font-nunito font-normal text-lg text-[#181818]/20"
                type="text"
                placeholder="What’s on your mind?"
              />
              <FiImage className="text-2xl absolute bottom-[45px] right-[80px]" />
              <RiSendPlaneFill className="bg-primary text-white p-2 text-4xl absolute bottom-[40px] right-[30px] rounded-md" />
            </div>
            <div>
              
            </div>
          </div>
          <div className="w-1/4">
            <h2>jhjkyu</h2>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Home;
