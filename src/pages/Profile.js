import React, { useState, useEffect } from "react";
import ExprDe from "../components/ExprDe";
import Expredu from "../components/Expredu";
import Flex from "../components/Flex";
import Header from "../components/Header";
import Images from "../components/Images";
import Users from "../components/Users";
import { useSelector } from "react-redux";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Loader from "../components/Loader";
import { getCurrentUser, getLoginUser } from "../Api/functional";
import ProfileEdit from "../components/ProfileEdit";
import AboutMe from "../components/AboutMe";
import MyPost from "../components/MyPost";
import { getDatabase, onValue, ref } from "firebase/database";

const Profile = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [loder, setLoder] = useState(true);
  const db = getDatabase();
  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else {
      setLoder(false);
    }
  }, []);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(data, setCurrentUser);
  }, []);
  // console.log(currentUser,"profile");

  const [toggleTab, setToggleTab] = useState(1);
  let handleToggle = (index) => {
    setToggleTab(index);
  };
  const [allUsersList, setAllUsersList] = useState([]);
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push({ ...item.val() });
        }
      });
      setAllUsersList(arr);
    });
  }, []);

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
                <div className="w-3/5 relative">
                  {/* Proflie info */}
                  <div className="bg-white">
                    <Images imgsrc="assets/cover2.png" className={`w-full`} />
                  </div>

                  <div className="relative px-6 bg-white pb-9">
                    <Flex className=" gap-x-6 items-center mb-5 relative">
                      <div className="w-[170px]  ">
                        <Images
                          imgsrc={currentUser.profile_picture}
                          className="w-full -mt-8 rounded-full border-4 border-solid border-white shadow-lg"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold font-nunito text-xl text-[#181818]">
                          {currentUser.username}
                        </h3>
                        <h3 className="font-bold font-nunito text-xl text-[#181818]">
                          {currentUser.headline}
                        </h3>
                      </div>
                    </Flex>
                    <div>
                      <h3 className="font-bold font-nunito text-xl text-[#181818]">
                        {currentUser.city}, {currentUser.location}
                      </h3>
                      <p className="font-bold font-nunito text-xl text-[#181818]">
                        {currentUser.college}
                      </p>
                      <p className="font-bold font-nunito text-xl text-[#181818]">
                        {currentUser.website}
                      </p>
                    </div>
                    <div className="mt-5">
                      {/* Profilr Edit */}
                      <ProfileEdit />
                    </div>
                  </div>

                  {/* End Proflie info */}

                  <div className="bg-white mt-5 px-5 py-8">
                    <button
                      onClick={() => handleToggle(1)}
                      className={` ${
                        toggleTab == 1
                          ? "bg-primary text-white"
                          : "transparent text-primary border-primary border-solid border"
                      }  inline-block py-2 px-[100px] rounded-md font-medium font-pophins text-lg mr-3`}
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleToggle(2)}
                      className={` ${
                        toggleTab == 2
                          ? "bg-primary text-white"
                          : "transparent text-primary border-primary border-solid border"
                      }  inline-block py-2 px-[100px] rounded-md font-medium font-pophins text-lg mr-3`}
                    >
                      Post
                    </button>
                  </div>
                  {/* About */}
                  <div className={` ${toggleTab == 1 ? "block" : "hidden"}  `}>
                    <AboutMe />
                  </div>
                  <div className={` ${toggleTab == 2 ? "block" : "hidden"}  `}>
                    <MyPost />
                  </div>
                </div>

                <div className="w-2/5 ">
                  <div className="p-9 pb-3 bg-white rounded-lg ">
                    <h2 className="font-bold font-nunito text-xl text-[#181818] mb-5 border-b border-solid border-slate-300 pb-3">
                      All users
                    </h2>
                    {allUsersList.map((item) => (
                      <Users key={item.userId} item={item} />
                    ))}
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
