import React, { useState, useEffect } from "react";
import Flex from "../../components/Flex";
import Header from "../../components/Header";
import Home2 from "../../components/Home2";
import { FiImage } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import Images from "../../components/Images";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [show, setShow] = useState(false);
  let [verify, setVerify] = useState(false);
  let [message, setMessage] = useState("");
  let [mess, setMess] = useState("");
  let navigate = useNavigate();

  let data = useSelector((state) => state.allusersInfo.userInfo);
  // console.log(data)
  onAuthStateChanged(auth, (user) => {
    if (user.emailVerified) {
      setVerify(true);
    }
  });
  // useEffect(() => {
  //   if (!data) {
  //     navigate("/");
  //   }
  // }, []);
  // let handleMessage = (e) => {
  //   setMessage(e.target.value);
  // };
  let handleMess = (e) => {
    setMess(e.target.value);
    console.log(21);
  };
  // let handlePost = () => {
  //   set(push(ref(db, "newPost")), {
  //     createPostId: data.uid,
  //     message: message,
  //     postBy: data.displayName,
  //   });
  // };
  return (
    <>
      {/* {verify ? ( */}
        <Home2 />

      {/* ) : ( */}
       {/*  <Flex className="h-screen justify-center items-center bg-[#F7F9FB]">
          <div className="bg-white shadow-lg w-1/2 px-5 py-10 rounded-3xl">
            <h2 className="text-center text-4xl font-semibold font-nunito text-primary">
              Please Veryfi your mail
            </h2>
          </div>
        </Flex> */}
      {/* )} */}

      {/* veryfi site */}
    </>
  );
};

export default Home;
