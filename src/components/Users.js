import React from "react";
import Flex from "./Flex";
import Images from "./Images";

const Users = ({item}) => {
  return (
    <Flex className="gap-x-4 items-center mb-4">
      <div>
        <Images imgsrc={item.profile_picture} className="rounded-full w-[100px]" />
      </div>
      <div>
        <h3 className="font-bold font-nunito text-base text-[#181818]">
          {item.username}
        </h3>
        <p>{item.headline}</p>
      </div>
      <div className="ml-auto">
        <button className="bg-primary text-white font-medium font-nunito px-4 py-2 rounded-lg ">
          {"Add Friend"}
        </button>
      </div>
    </Flex>
  );
};

export default Users;
