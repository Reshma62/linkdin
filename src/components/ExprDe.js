import React from "react";
import Flex from "./Flex";
import Images from "./Images";

const ExprDe = ({ imgsrc, jobTitle, year, description, place, time }) => {
  return (
    <>
      <Flex className="gap-x-5 mb-5">
        <div className="w-[50px] h-[50px]">
          <Images className={`w-full h-full border border-solid border-black rounded-full`} imgsrc={imgsrc} />
        </div>
        <div className="w-[80%]">
          <h2 className="font-bold font-nunito text-lg text-[#181818]">
            {jobTitle}
          </h2>
          <p>{year}</p>
          <p>{place}</p>
          <p>{time}</p>
          <p>{description}</p>
        </div>
      </Flex>
    </>
  );
};

export default ExprDe;
