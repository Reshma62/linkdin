import React, { useState } from "react";
import {
  getDatabase,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

const AddEducation = ({ setIsOpen }) => {
  const db = getDatabase();
  const storage = getStorage();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [workDuration, setWorkDuration] = useState("");
  const [workDetails, setWorkDetails] = useState("");
  const [workSystem, setWorkSystem] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [img, setImg] = useState(null);
  let data = useSelector((state) => state.allusersInfo.userInfo);
  let handleTitle = (e) => {
    setTitle(e.target.value);
  };
  let handleSubTitle = (e) => {
    setSubTitle(e.target.value);
  };
  let handleCompanyName = (e) => {
    setCompany(e.target.value);
  };
  let handleWorkDuration = (e) => {
    setWorkDuration(e.target.value);
  };
  let handleWorkDetails = (e) => {
    setWorkDetails(e.target.value);
  };
  let handleWorkSystem = (e) => {
    setWorkSystem(e.target.value);
  };
  let handleImg = (e) => {
    setImg(e.target.files[0]);
  };
  let handleAddExprience = () => {
    const storageRef = strRef(storage, "projcetsImg/" + uuid());

    const uploadTask = uploadBytesResumable(storageRef, img);
    uploadTask.on(
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          set(push(ref(db, "education")), {
            projectTitle: title,
            company,
            workDuration,
            workDetails,
            workSystem,
            projectImg: downloadURL,

            userId: data.uid,
            userName: data.displayName,
            timeStamp: serverTimestamp(),
          });
          setIsOpen(false);
        });
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <input
        onChange={handleTitle}
        className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none"
        type="text"
        placeholder="Add your Designation"
      />
      <input
        onChange={handleCompanyName}
        className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none"
        type="text"
        placeholder="Add your company name"
      />
      <input
        onChange={handleWorkDuration}
        className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none"
        type="text"
        placeholder="Add your work duration"
      />
      <input
        onChange={handleWorkDetails}
        className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none"
        type="text"
        placeholder="Add your Work Details"
      />
      <input
        onChange={handleWorkSystem}
        className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none"
        type="text"
        placeholder="Add your Work System"
      />
      <input
        onChange={handleImg}
        type="file"
        placeholder="Add your Project sub Title"
      />
      {img && (
        <img className="w-[300px]" src={URL.createObjectURL(img)} alt="" />
      )}
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-primary text-base leading-6 font-medium text-white shadow-sm  focus:outline-none  focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5 mr-5"
        onClick={handleAddExprience}
      >
        Send
      </button>
    </div>
  );
};

export default AddEducation;
