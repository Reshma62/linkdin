import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../Api/functional";
import { useSelector } from "react-redux";
import Images from "./Images";

const RightSidebarHome = () => {
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(data, setCurrentUser);
  }, []);

  return (
    <div className="w-1/4">
      <div className="bg-white pb-8 rounded-md shadow-lg relative mb-9">
        <Images imgsrc="assets/cover.png" className="w-full" />
        <div className="flex justify-center -mt-12 mb-4">
          <Images
            imgsrc={currentUser.profile_picture}
            className="shadow-lg rounded-full w-[75px]"
          />
        </div>
        <div className="text-center">
          <h3 className="font-bold font-nunito text-base text-[#181818]">
            {currentUser.username}
          </h3>
          <p className="font-normal font-nunito text-sm text-[#181818] max-w-[300px] mx-auto mt-4">
            {currentUser.headline}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebarHome;
