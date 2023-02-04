import React from "react";
import Flex from "./Flex";
import Images from "./Images";

const Expredu = ({ heading, imgsrc, button ,children}) => {
  return (

      <Flex className="justify-between mb-5 items-center">
        <h2 className="font-bold font-nunito text-xl text-[#181818]">
          {heading}
        </h2>
        <button className="bg-primary text-white font-medium font-nunito px-6 py-3 rounded-lg ">
          {button}
        </button>
      </Flex>
  );
};

export default Expredu;
