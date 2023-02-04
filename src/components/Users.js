import React from "react";
import Flex from "./Flex";
import Images from "./Images";

const Users = ({img, userName, userBio, addFriend}) => {
  return (
    <Flex className="gap-x-4 items-center mb-4">
      <div>
        <Images imgsrc={img} />
      </div>
      <div>
        <h3 className="font-bold font-nunito text-base text-[#181818]">
          {userName}
        </h3>
        <p>{userBio}</p>
      </div>
      <div className="ml-auto">
        <button className="bg-primary text-white font-medium font-nunito px-4 py-2 rounded-lg ">
          {addFriend}
        </button>
      </div>
    </Flex>
  );
};

export default Users;
