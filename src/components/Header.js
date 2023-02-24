import React, { useState } from "react";
import Flex from "./Flex";
import Images from "./Images";
import { BsSearch, BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineLogin } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../slices/UserSlices";
const Header = ({ show }) => {
  let [show2, setShow2] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.allusersInfo.userInfo);
  let handleLogout = () => {
    navigate("/login");
    dispatch(allUsers(null));
    localStorage.removeItem("userLoginInfo");
  };

  return (
    <nav className="px-14 bg-white">
      <Flex className="justify-between items-center h-20">
        <Link
          to="/"
          className="w-[100px] grid h-full items-center border-r border-solid border-[#F4F4F4]"
        >
          <Images imgsrc="assets/logo.png" />
        </Link>
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
            <div
              className="relative cursor-pointer"
              onClick={() => setShow2(!show2)}
            >
              <div className="w-[10%] flex flex-col justify-center items-center border-solid border-x border-[#F4F4F4]">
                <BsThreeDots />
                <p className="font-nunito font-medium text-[#181818] uppercase">
                  other
                </p>
              </div>
              {show2 && (
                <div className="absolute right-10 z-20 top-12 bg-[#f4f4f4] border border-solid border-[#181818] p-5 w-[180px] rounded-lg">
                  <Link
                    to="/profile"
                    className="border-solid border-b border-[#ddd] pb-3 mb-2 flex items-center gap-x-3 cursor-pointer"
                  >
                    Profile
                    <ImProfile className="text-lg" />
                  </Link>
                  <p className="border-solid border-b border-[#ddd] pb-3 mb-2 flex items-center gap-x-3 cursor-pointer">
                    Settings
                    <FiSettings className="text-lg" />
                  </p>
                  <p onClick={handleLogout} className=" flex items-center gap-x-3 cursor-pointer">
                    Log Out
                    <AiOutlineLogin className="text-lg" />
                  </p>
                </div>
              )}
            </div>
          )}
        </Flex>
      </Flex>
    </nav>
  );
};

export default Header;
