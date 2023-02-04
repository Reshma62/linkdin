import React from "react";
import Flex from "./Flex";
import Images from "./Images";

const ExprDe = ({ imgsrc,jobTitle, year,description, place, time }) => {
  return (
    <Flex className="gap-x-3 mb-5">
      <div>
        <Images imgsrc={imgsrc} />
      </div>

      <div>
        <h2>{jobTitle}</h2>
        <p>{year}</p>
        <p>{place}</p>
        <p >{time}</p>
        <p>
          {description}
        </p>
      </div>
    </Flex>
  );
};

export default ExprDe;
