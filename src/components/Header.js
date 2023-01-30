import React from "react";
import Flex from "./Flex";
import Images from "./Images";
import { BsSearch, BsThreeDots } from "react-icons/bs";
const Header = ({ show }) => {
  return (
    <nav className="px-14">
      <Flex className="justify-between items-center h-20">
        <div className="w-[100px] grid h-full items-center border-r border-solid border-[#F4F4F4]">
          <Images imgsrc="assets/logo.png" />
        </div>
        <Flex className="justify-between w-3/5 h-full">
          <div className=" grid items-center w-[50%] relative border-solid border-x border-[#F4F4F4]">
            <input
              type="text"
              placeholder="search "
              className="w-full pl-20 outline-none placeholder:text-xl placeholder:text-[#CECECE] placeholder:capitalize py-5 bg-transparent"
            />
            <BsSearch className="absolute top-1/2 -translate-y-1/2 left-8 text-[#0275B1] text-2xl" />
          </div>
          <div className="w-[40%] grid items-center pl-8 ">
            <Flex className="gap-x-4">
              <div>
                <Images imgsrc="assets/navProfile.png" />
              </div>
              <h4 className="font-nunito font-medium text-[#181818] uppercase">
                D. Kargaev
              </h4>
              <p className="font-nunito font-medium text-[#181818]/20 uppercase">
                You
              </p>
            </Flex>
          </div>
          {show && (
            <div className="w-[10%] flex flex-col justify-center items-center border-solid border-x border-[#F4F4F4]">
              <BsThreeDots />
              <p className="font-nunito font-medium text-[#181818] uppercase">
                other
              </p>
            </div>
          )}
        </Flex>
      </Flex>
    </nav>
  );
};

export default Header;
