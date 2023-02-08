import React, { useState, useEffect } from "react";
import Flex from "../components/Flex";
import Header from "../components/Header";
import { FiImage } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import Images from "../components/Images";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import ModalImage from "react-modal-image";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [show, setShow] = useState(false);
  let [verify, setVerify] = useState(false);
  let [showPost, setShowPost] = useState([]);
  let [message, setMessage] = useState("");
  let [image, setImage] = useState("");
  let navigate = useNavigate();

  let data = useSelector((state) => state.allusersInfo.userInfo);
  let handleMessage = (e) => {
    setMessage(e.target.value);
  };
  let handlePost = () => {
    set(push(ref(db, "newPost")), {
      createPostId: data.uid,
      message: message,
      postBy: data.displayName,
      image: image,
    });
    setImage("");
    setMessage("");
  };
  // console.log(data)
  let uploadImg = (e) => {
    const storage = getStorage();
    const storageRef = sref(storage, "imgupload/" + e.target.files[0].name);

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    const postRef = ref(db, "newPost");
    onValue(postRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val());
      });

      setShowPost(arr);
    });
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const emailVerified = user.emailVerified;
      if (emailVerified) {
        setVerify(true);
      } else {
        setVerify(false);
      }
    });
  }, []);
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="bg-[#F7F9FB]">
        <Header show={true} />
        <div className="container mx-auto mt-10 ">
          <Flex className="gap-x-10">
            <div className="w-3/4 ">
              {/* New Post */}
              <div className="bg-white p-8 rounded-md shadow-lg relative mb-9">
                <p className="text-[#181818] uppercase font-medium font-nunito text-base border-b border-solid border-red-500 pb-4 mb-8">
                  new post
                </p>
                <div>
                  <input
                    onChange={handleMessage}
                    className="w-full outline-none font-nunito font-normal text-lg placeholder:text-[#181818]/20"
                    type="text"
                    value={message}
                    placeholder="Whats on your mind?"
                    // onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div>
                  {image && (
                    <img src={image} alt="" className="w-[100px] h-[100px]" />
                  )}

                  <label>
                    <input
                      onChange={uploadImg}
                      type="file"
                      name=""
                      id=""
                      className="hidden"
                    />
                    <FiImage className="text-2xl absolute bottom-[45px] right-[80px]" />
                  </label>

                  <RiSendPlaneFill
                    onClick={handlePost}
                    className="bg-primary text-white p-2 text-4xl absolute bottom-[40px] right-[30px] rounded-md cursor-pointer"
                  />
                </div>
              </div>
              {/* post */}
              {showPost.map((item) => (
                <div className="bg-white pb-8 pt-4 rounded-md shadow-lg mb-9 relative ">
                  <BiDotsHorizontal
                    onClick={() => setShow(!show)}
                    className="text-right ml-auto text-3xl mb-5 mr-6 cursor-pointer"
                  />
                  {show && (
                    <div className="absolute right-0 top-12 bg-[#f4f4f4] border border-solid border-[#181818] p-5 w-[180px] rounded-lg">
                      <p className="border-solid border-b border-[#ddd] pb-3 mb-2 flex items-center gap-x-3">
                        Edit Post <AiOutlineEdit className="text-lg" />
                      </p>
                      <p className=" flex items-center gap-x-3">
                        Delete Post <AiTwotoneDelete className="text-lg" />
                      </p>
                    </div>
                  )}
                  <Flex className="items-center px-8 py-5 gap-5 border-t border-solid border-red-500">
                    <div>
                      <Images imgsrc="assets/Photo.png" />
                    </div>
                    <div>
                      <h3 className="font-bold font-nunito text-base text-[#181818]">
                        {item.postBy}
                      </h3>
                      <p className="font-normal font-nunito text-xs text-[#181818]">
                        Product designer at Commandor Corp.
                      </p>
                    </div>
                  </Flex>
                  <p className="px-8 font-normal font-nunito text-sm mb-4 text-[#181818]">
                    {item.message}
                  </p>
                  {item.image && (
                    <div className="px-8">
                      <ModalImage
                        small={item.image}
                        large={item.image}
                        alt="Hello World!"
                      />
                    </div>
                  )}

                  {/* <img className="px-8" src={item.image} alt="" /> */}
                </div>
              ))}
              {/* <div className="bg-white pb-8 pt-4 rounded-md shadow-lg mb-9 relative ">
                <BiDotsHorizontal
                  onClick={() => setShow(!show)}
                  className="text-right ml-auto text-3xl mb-5 mr-6 cursor-pointer"
                />
                {show && (
                  <div className="absolute right-0 top-12 bg-[#f4f4f4] border border-solid border-[#181818] p-5 w-[180px] rounded-lg">
                    <p className="border-solid border-b border-[#ddd] pb-3 mb-2 flex items-center gap-x-3">
                      Edit Post <AiOutlineEdit className="text-lg" />
                    </p>
                    <p className=" flex items-center gap-x-3">
                      Delete Post <AiTwotoneDelete className="text-lg" />
                    </p>
                  </div>
                )}
                <Flex className="items-center px-8 py-5 gap-5 border-t border-solid border-red-500">
                  <div>
                    <Images imgsrc="assets/Photo.png" />
                  </div>
                  <div>
                    <h3 className="font-bold font-nunito text-base text-[#181818]">
                      Kyle Fisher
                    </h3>
                    <p className="font-normal font-nunito text-xs text-[#181818]">
                      Product designer at Commandor Corp.
                    </p>
                  </div>
                </Flex>
                <p className="px-8 font-normal font-nunito text-sm mb-4 text-[#181818]">
                  Hows your day going, guys?
                </p>
                <img className="px-8" src="assets/img.png" alt="" />
              </div> */}
            </div>
            <div className="w-1/4">
              <div className="bg-white pb-8 rounded-md shadow-lg relative mb-9">
                <Images imgsrc="assets/cover.png" className="w-full" />
                <div className="flex justify-center -mt-12 mb-4">
                  <Images
                    imgsrc="assets/profile.png"
                    className="shadow-lg rounded-full"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-bold font-nunito text-base text-[#181818]">
                    Dmitry Kargaev
                  </h3>
                  <p className="font-normal font-nunito text-sm text-[#181818] max-w-[300px] mx-auto mt-4">
                    Freelance UX/UI designer, 80+ projects in web design, mobile
                    apps (iOS & android) and creative projects. Open to offers.
                  </p>
                </div>
              </div>
            </div>
          </Flex>
        </div>
      </div>
      {!verify && (
        <Flex className="h-screen justify-center items-center bg-[#F7F9FB] absolute top-0 left-0 w-full">
          <div className="bg-white shadow-lg w-1/2 px-5 py-10 rounded-3xl">
            <h2 className="text-center text-4xl font-semibold font-nunito text-primary">
              Please Veryfi your mail
            </h2>
          </div>
        </Flex>
      )}
    </>
  );
};

export default Home;
