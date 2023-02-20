import React, { useState, useEffect } from "react";
import ExprDe from "../components/ExprDe";
import Expredu from "../components/Expredu";
import Flex from "../components/Flex";
import Header from "../components/Header";
import Images from "../components/Images";
import Users from "../components/Users";
import { useSelector } from "react-redux";
import { MdOutlineEditCalendar } from "react-icons/md";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getStorage,
  ref as stgref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { getAuth, signOut, updateProfile } from "firebase/auth";
const Profile = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState("");
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [bio, setBio] = useState("");
  const [showBioField, setShowBioField] = useState(false);
  let handleBioAdd = () => {};
  let handleBioText = () => {};
  let handleUpdateBio = () => {};
  let handleUpdateBio2 = () => {};

  let [showPopUp, setShowPopUp] = useState(false);
  let handleProfilePic = () => {
    setShowPopUp(true);
  };
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }

    const storage = getStorage();
    const storageRef = stgref(storage, "proflie-pic/" + auth.currentUser.uid);
    const message4 = cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
      getDownloadURL(storageRef).then((downloadURL) => {
        updateProfile(auth.currentUser, {
          photoURL: downloadURL,
        })
          .then(() => {
            setShowPopUp(false);
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      });
    });
  };
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const users = ref(db, "users/");
    onValue(users, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      } );

      setUserList(arr);
    });
  }, []);

  return (
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
                    onClick={handleProfilePic}
                    imgsrc={data.photoURL}
                    className="w-full -mt-8 rounded-full border-4 border-solid border-white shadow-lg"
                  />
                </div>

                <div className="mt-5 w-[600px]">
                  <h3 className="font-bold font-nunito text-xl text-[#181818]">
                    {data.displayName}
                  </h3>

                  <p className="flex gap-x-3 items-center font-normal font-nunito text-base text-[#181818] max-w-[98%]  my-3">
                    {bio}{" "}
                    <MdOutlineEditCalendar
                      onClick={handleBioAdd}
                      className="text-2xl w-[200px]"
                    />
                  </p>

                  {showBioField && (
                    <div className="absolute top-[350px]">
                      <div className="bg-[red] shadow-lg w-full">
                        <textarea
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          defaultValue={bio}
                          className="w-full"
                          onChange={handleBioText}
                        ></textarea>
                        <button
                          onClick={handleUpdateBio}
                          className="bg-primary text-white font-medium font-nunito px-11 py-3 rounded-lg uppercase"
                        >
                          Update
                        </button>
                        <button
                          onClick={handleUpdateBio2}
                          className="bg-primary text-white font-medium font-nunito px-11 py-3 rounded-lg uppercase"
                        >
                          Update2
                        </button>
                      </div>
                    </div>
                  )}
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
                  banking apps, but also like to work with creative projects,
                  such as landing pages or unusual corporate websites.{" "}
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
                <Flex className={`flex-wrap gap-8 h-[500px] overflow-y-auto `}>
                  <div className="w-[30%]">
                    <div className="mb-4 max-w-full">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4 w-full">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
                    </div>
                    <h4 className="font-bold font-nunito text-base text-[#181818]">
                      Zara redesign concept
                    </h4>
                    <p>UX/UI design, 15.07.2019</p>
                  </div>
                  <div className="w-[30%]">
                    <div className="mb-4">
                      <Images imgsrc="assets/project1.png" className="w-full" />
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
            </div>
            <div className="w-2/5 ">
              <div className="p-9 pb-3 bg-white rounded-lg ">
                <h2 className="font-bold font-nunito text-xl text-[#181818] mb-5 border-b border-solid border-slate-300 pb-3">
                  All users
                </h2>
                {userList.map((item) => (
                  <Users
                    img="assets/profile.png"
                    userName="Darlene Black "
                    userBio="HR-manager, 10 000 connec..."
                    addFriend="Add Friend"
                  />
                ))}
              </div>
            </div>
          </Flex>
        </div>
      </div>
      {/* Profile pic uploasd */}
      {showPopUp && (
        <div className="absolute top-0 left-0 z-50 bg-slate-200 w-full h-screen flex justify-center items-center">
          <div className="w-1/2 bg-gray-400 mx-auto flex justify-center items-center flex-col p-5 rounded-xl">
            <h2 className="text-3xl font-nunito font-bold py-3">
              Update your profile photo
            </h2>
            {image ? (
              <div
                className="img-preview rounded-full bg-red-200 overflow-hidden my-8"
                style={{ width: "100px", float: "left", height: "100px" }}
              ></div>
            ) : (
              <Images
                imgsrc={data.photoURL}
                className={`w-[100px] rounded-full my-8`}
              />
            )}

            {image && (
              <Cropper
                style={{ height: 200, width: "100%" }}
                initialAspectRatio={1}
                preview=".img-preview"
                src={image}
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                checkOrientation={false}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
            )}

            <input type="file" onChange={onChange} className="mb-8" />
            <button
              onClick={getCropData}
              className="bg-primary text-white font-medium font-nunito px-11 py-3 rounded-lg uppercase"
            >
              Upload
            </button>
          </div>
        </div>
      )}
      {/* Profile pic uploasd End*/}
    </div>
  );
};

export default Profile;
