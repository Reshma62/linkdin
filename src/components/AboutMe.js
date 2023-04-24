import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../Api/functional";
import { useSelector } from "react-redux";

import ExprDe from "../components/ExprDe";
import Expredu from "../components/Expredu";
import Flex from "../components/Flex";
import Images from "../components/Images";
import Projects from "./Projects";
const AboutMe = () => {
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(data, setCurrentUser);
  }, []);
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
     <Projects/>
      {/* End Projects */}
      {/* Exprience */}

      <div className="p-9 bg-white rounded-lg mb-5">
        <Expredu button={`Add Expriences`} heading="Experience"></Expredu>
        <ExprDe
          imgsrc="assets/logo.png"
          jobTitle="Freelance UX/UI designer"
          year="3 yrs 3 mos"
          description="Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes."
          place="Self Employed"
          time="Jun 2016 — Present"
        />
        <ExprDe
          imgsrc="assets/logo.png"
          jobTitle="Freelance UX/UI designer"
          year="3 yrs 3 mos"
          description="Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes."
          place="Self Employed"
          time="Jun 2016 — Present"
        />
      </div>

      {/*End Exprience */}
      {/* Education */}
      <div className="p-9 bg-white rounded-lg ">
        <Expredu button={`Add Education`} heading="Education"></Expredu>
        <ExprDe
          imgsrc="assets/cmlogo2.png"
          jobTitle="Freelance UX/UI designer"
          year="3 yrs 3 mos"
          description="Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes."
          place="Self Employed"
          time="Jun 2016 — Present"
        />
        <ExprDe
          imgsrc="assets/logo.png"
          jobTitle="Freelance UX/UI designer"
          year="3 yrs 3 mos"
          description="Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes."
          place="Self Employed"
          time="Jun 2016 — Present"
        />
      </div>
      {/*End Education */}
    </>
  );
};

export default AboutMe;
