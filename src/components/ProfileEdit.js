import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";
import { getCurrentUser } from "../Api/functional";
import { useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase.confige";
import { getDatabase, ref, update } from "firebase/database";

const ProfileEdit = () => {
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const db = getDatabase();
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(data, setCurrentUser);
  }, []);
  const [showEdit, setShowEdit] = useState(false);
  const [inputValus, setInputValus] = useState(currentUser);
  let updateInputs = (e) => {
    let { name, value } = e.target;

    let inputs = { [name]: value };
    setInputValus({ ...inputValus, ...inputs });
  };
  console.log("inputValus", inputValus);
  let handleUpdateProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: inputValus.username,
    })
      .then(() => {
        update(ref(db, "users/" + auth.currentUser.uid), {
          ...inputValus,
        });
      })
      .catch((error) => {
       console.log(error);
      } );
    setShowEdit(false);
  };

  return (
    <div className="">
      <FiEdit3
        onClick={() => setShowEdit(!showEdit)}
        className="text-2xl w-[200px] absolute right-0 top-10"
      />
      {showEdit && (
        <div className="w-[100%] bg-slate-100 mx-auto p-5 rounded-xl flex justify-between">
          <div className="w-[100%]">
            <div className="w-full">
              <p className="mb-3">Name</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Name"
                name="username"
                value={inputValus.username}
                defaultValue={inputValus.username}
              />
            </div>
            {/* <div className="w-full">
              <p className="mb-3">Email</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Email"
                name="email"
                value={inputValus.email}
              />
            </div> */}
            <div className="w-full">
              <p className="mb-3">Headline</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Headline"
                name="headline"
                value={inputValus.headline}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">Location</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Location"
                name="location"
                value={inputValus.location}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">College</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="College"
                name="college"
                value={inputValus.college}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">City</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="City"
                name="city"
                value={inputValus.city}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">Website</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Website"
                name="website"
                value={inputValus.website}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">About Me</p>
              <textarea
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg resize-none w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10 h-[112px]"
                type="text"
                placeholder="About Me...."
                name="aboutMe"
                value={inputValus.aboutMe}
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full py-5 rounded-full"
            >
              Update
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowEdit(!showEdit)}
              className="hover:bg-white p-5 rounded-full"
            >
              <AiOutlineCloseCircle className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
