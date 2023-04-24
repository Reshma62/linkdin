import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../Api/functional";
import { useSelector } from "react-redux";

import ExprDe from "../components/ExprDe";
import Expredu from "../components/Expredu";
import Projects from "./Projects";
import Modal from "./Modal";
import AddExprience from "./AddExprience";
import AddEducation from "./AddEducation";
import Expriences from "./Expriences";
import Education from "./Education";
const AboutMe = () => {
  let data = useSelector((state) => state.allusersInfo.userInfo);

  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(data, setCurrentUser);
  }, [] );

  return (
    <>
      <div className="p-9 mt-5 bg-white rounded-lg mb-5">
        <h2 className="font-bold font-nunito text-xl text-[#181818]">About</h2>
        <p className="font-normal font-nunito text-base text-[#181818] max-w-[98%]  my-3">
          {currentUser.aboutMe}
        </p>
      </div>
      {/* End About */}
      {/* Projects */}
      <Projects />
      {/* End Projects */}
      {/* Exprience */}

      <Expriences/>

      {/*End Exprience */}
      {/* Education */}
      <Education/>
      {/*End Education */}

    </>
  );
};

export default AboutMe;
