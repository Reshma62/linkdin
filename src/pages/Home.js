import React, { useState, useEffect } from "react";
import Flex from "../components/Flex";
import Header from "../components/Header";
import { FiImage } from "react-icons/fi";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
} from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as StroageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { allUsers } from "../slices/UserSlices";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { v4 as uuidv4 } from "uuid";
import RightSidebarHome from "../components/RightSidebarHome";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { getCurrentUser } from "../Api/functional";
const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  const storage = getStorage();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [verify, setVerify] = useState("");
  const [loder, setLoder] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);

  let data = useSelector((state) => state.allusersInfo.userInfo);

  const [input, setInput] = useState("");
  const [img, setImg] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setVerify(user);
        dispatch(allUsers(user));
        localStorage.setItem("userLoginInfo", JSON.stringify(user));
        // console.log(user);
      } else {
        alert("users not found or may be singout");
      }
    });
  }, []);

  useEffect(() => {
    if (!data) {
      navigate("/login");
    } else {
      setLoder(false);
    }
  }, []);
  let handlePost = (e) => {
    setInput(e.target.value);
  };
  let sendEmoji = (emoji) => {
    setInput(input+emoji.emoji);
  };
  let postImg = (e) => {
    setImg(e.target.files[0]);
  };
  let handlePostSend = () => {
    // if (input) {
    if (img) {
      console.log("ami if",img.name);
      const storageRef = StroageRef(storage, "postImg/" + img.name);

      const uploadTask = uploadBytesResumable(storageRef, img);
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
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            set(push(ref(db, "post")), {
              userId: data.uid,
              userName: data.displayName,
              postMess: input,
              postImg: downloadURL,
              userPhoto: data.photoURL,
              timeStamp: serverTimestamp(),
              date: `${new Date().getFullYear()} ${
                new Date().getMonth() + 1
              } ${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            });
            setInput("");
            setImg("");
            console.log("ami img");
          });
        }
      );
    } else {
      console.log("ami else");
      set(push(ref(db, "post")), {
        userId: data.uid,
        userName: data.displayName,
        postMess: input,
        userPhoto: data.photoURL,
        timeStamp: serverTimestamp(),
        date: `${new Date().getFullYear()} ${
          new Date().getMonth() + 1
        } ${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      });
      setInput("");
      setImg("");
    }
    /* } else {
      alert("Write somthing");
    } */
  };

  // console.log(currentUser, "currentUser home");
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const postsRef = ref(db, "post/");
    onValue(postsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), postId: item.key });
      });
      setAllPosts(arr);
    });
  }, []);
  // console.log(allPosts, "Post all");
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    getCurrentUser(data, setCurrentUser);
  }, []);
  return (
    <>
      {loder ? (
        <Loader />
      ) : (
        verify &&
        !verify.emailVerified && (
          <Flex className="h-screen justify-center items-center bg-[#F7F9FB] absolute top-0 left-0 w-full">
            <div className="bg-white shadow-lg w-1/2 px-5 py-10 rounded-3xl">
              <h2 className="text-center text-4xl font-semibold font-nunito text-primary">
                Please Verify your Email
              </h2>
            </div>
          </Flex>
        )
      )}
      {verify && (
        <div className="bg-[#F7F9FB]">
          <Header show={true} />
          <div className="container mx-auto mt-10 ">
            <Flex className="gap-x-10">
              <div className="w-3/4 ">
                {/* New Post */}
                <div className="bg-white p-8 rounded-md shadow-lg relative mb-9">
                  <p className="text-[#181818] uppercase font-medium font-nunito text-base border-b border-solid border-red-500 pb-4 mb-8">
                    New post
                  </p>
                  <div>
                    <input
                      className="w-full outline-none font-nunito font-normal text-lg placeholder:text-[#181818]/20"
                      type="text"
                      placeholder={`Whats on your mind ${currentUser.username}?`}
                      onChange={handlePost}
                      value={input}
                      onFocus={() => setShowEmoji(false)}
                    />
                  </div>
                  <div>
                    <BsEmojiSmile
                      onClick={() => setShowEmoji(!showEmoji)}
                      className="cursor-pointer text-2xl absolute bottom-[45px] right-[120px]"
                    />
                    {showEmoji && (
                      <div className="absolute top-[140px] right-[10px] z-50">
                        <EmojiPicker
                          onEmojiClick={(emoji) => sendEmoji(emoji)}
                        />
                      </div>
                    )}

                    {img && (
                      <div className="relative w-[200px] h-[200px]">
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          className="w-full"
                        />
                        <AiOutlineCloseCircle
                          onClick={() => setImg(null)}
                          className=" text-3xl absolute -top-5 -right-10 cursor-pointer"
                        />
                      </div>
                    )}

                    <label>
                      <input
                        onChange={postImg}
                        type="file"
                        name=""
                        id=""
                        className="hidden"
                      />
                      <FiImage className="text-2xl absolute bottom-[45px] right-[80px] cursor-pointer" />
                    </label>
                    <div onClick={handlePostSend}>
                      {" "}
                      <RiSendPlaneFill className="bg-primary text-white p-2 text-4xl absolute bottom-[40px] right-[30px] rounded-md cursor-pointer" />
                    </div>
                  </div>
                </div>
                {/* post */}
                {allPosts
                  .sort((a, b) => b.timeStamp - a.timeStamp)
                  .map((item) => (
                    <Post key={item.postId} item={item} />
                  ))}
              </div>
              {/* Right SideBar */}
              <RightSidebarHome />
            </Flex>
          </div>
        </div>
      )}

      {/*  */}
    </>
  );
};

export default Home;
