import React, { useState, useEffect } from "react";
import ExprDe from "../components/ExprDe";
import Expredu from "../components/Expredu";
import Flex from "../components/Flex";
import Header from "../components/Header";
import Images from "../components/Images";
import Users from "../components/Users";
import { useSelector } from "react-redux";
import { MdOutlineEditCalendar } from "react-icons/md";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Loader from "../components/Loader";

const Profile = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [ loder, setLoder ] = useState( true );

  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else {
      setLoder(false);
    }
  }, []);
  console.log(data);


  return (
    <>
      {loder ? (
        <Loader />
      ) : (
        <div className="">
          <div className="bg-[#F7F9FB] ">
            <Header show={true} />
            <div className="container mx-auto mt-16 relative">
              <Flex className="gap-x-10">
                <div className="w-3/5 ">
                  {/* Proflie info */}
                  <div className="bg-white">
                    <Images imgsrc="assets/cover2.png" className={`w-full`} />
                  </div>

                  <Flex className="px-6 bg-white pb-9 gap-x-6 items-center mb-5">
                    <div className="w-[170px]  ">
                      <Images
                        imgsrc="assets/avatar.png"
                        className="w-full -mt-8 rounded-full border-4 border-solid border-white shadow-lg"
                      />
                    </div>

                    <div className="mt-5 w-[600px]">
                      <h3 className="font-bold font-nunito text-xl text-[#181818]">
                        gfgdfgd
                      </h3>

                      <p className="flex gap-x-3 items-center font-normal font-nunito text-base text-[#181818] max-w-[98%]  my-3">
                        jkhjkgjhg
                        <MdOutlineEditCalendar className="text-2xl w-[200px]" />
                      </p>

                      {/* <div className="absolute top-[350px]">
                    <div className="bg-[red] shadow-lg w-full">
                      <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="10"
                        className="w-full"
                      ></textarea>
                      <button className="bg-primary text-white font-medium font-nunito px-11 py-3 rounded-lg uppercase">
                        Update
                      </button>
                      <button className="bg-primary text-white font-medium font-nunito px-11 py-3 rounded-lg uppercase">
                        Update2
                      </button>
                    </div>
                  </div> */}

                      <button className="bg-primary text-white font-medium font-nunito px-11 py-3 rounded-lg uppercase">
                        Contact info
                      </button>
                    </div>
                  </Flex>
                  {/* End Proflie info */}
                  {/* About */}
                  <div className="p-9 bg-white rounded-lg mb-5">
                    <h2 className="font-bold font-nunito text-xl text-[#181818]">
                      About
                    </h2>
                    <p className="font-normal font-nunito text-base text-[#181818] max-w-[98%]  my-3">
                      I'm more experienced in eCommerce web projects and mobile
                      banking apps, but also like to work with creative
                      projects, such as landing pages or unusual corporate
                      websites.{" "}
                    </p>
                  </div>
                  {/* End About */}
                  {/* Projects */}
                  <div className="p-9 bg-white rounded-lg mb-5">
                    <Flex className="justify-between mb-5 items-center">
                      <h2 className="font-bold font-nunito text-xl text-[#181818]">
                        Projects
                      </h2>
                      <button className="bg-primary text-white font-medium font-nunito px-6 py-3 rounded-lg ">
                        Add Project
                      </button>
                    </Flex>
                    <Flex
                      className={`flex-wrap gap-8 h-[500px] overflow-y-auto `}
                    >
                      <div className="w-[30%]">
                        <div className="mb-4 max-w-full">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4 w-full">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                      <div className="w-[30%]">
                        <div className="mb-4">
                          <Images
                            imgsrc="assets/project1.png"
                            className="w-full"
                          />
                        </div>
                        <h4 className="font-bold font-nunito text-base text-[#181818]">
                          Zara redesign concept
                        </h4>
                        <p>UX/UI design, 15.07.2019</p>
                      </div>
                    </Flex>
                  </div>
                  {/* End Projects */}
                  {/* Exprience */}

                  <div className="p-9 bg-white rounded-lg mb-5">
                    <Expredu
                      button={`Add Expriences`}
                      heading="Experience"
                    ></Expredu>
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
                    <Expredu
                      button={`Add Education`}
                      heading="Education"
                    ></Expredu>
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
                </div>
                <div className="w-2/5 ">
                  <div className="p-9 pb-3 bg-white rounded-lg ">
                    <h2 className="font-bold font-nunito text-xl text-[#181818] mb-5 border-b border-solid border-slate-300 pb-3">
                      All users
                    </h2>

                    <Users
                      img="assets/avatar.png"
                      userName="userName"
                      userBio="HR-manager, 10 000 connec..."
                      addFriend="Add Friend"
                    />
                  </div>
                </div>
              </Flex>
            </div>
          </div>
          {/* Profile pic uploasd */}

          {/* <div className="absolute top-0 left-0 z-50 bg-slate-200 w-full h-screen flex justify-center items-center">
        <div className="w-1/2 bg-gray-400 mx-auto flex justify-center items-center flex-col p-5 rounded-xl">
          <h2 className="text-3xl font-nunito font-bold py-3">
            Update your profile photo
          </h2>

          <div
            className="img-preview rounded-full bg-red-200 overflow-hidden my-8"
            style={{ width: "100px", float: "left", height: "100px" }}
          ></div>

          <Images
            imgsrc="assets/avatar.png"
            className={`w-[100px] rounded-full my-8`}
          />

          <input type="file" className="mb-8" />
          <button className="bg-primary text-white font-medium font-nunito px-11 py-3 rounded-lg uppercase">
            Upload
          </button>
        </div>
      </div> */}

          {/* Profile pic uploasd End*/}
        </div>
      )}
    </>
  );
};

export default Profile;
