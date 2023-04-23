import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Flex from "../components/Flex";
import Images from "../components/Images";
import InputBox from "../components/InputBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProgressBar } from "react-loader-spinner";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../slices/UserSlices";
const Registation = () => {
  const auth = getAuth();
  const db = getDatabase();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  let handleFullname = (e) => {
    setText(e.target.value);
    setTextError("");
  };
  const validate = () => {
    let textError = "";
    let emailError = "";
    let passwordError = "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!text) {
      textError = "Full Name is required";
    }

    if (!email) {
      emailError = " Email address is required";
    } else {
      if (!email.match(mailformat)) {
        emailError = "Invalid email address";
      }
    }
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (!password) {
      passwordError = "Password is required";
    }
    /*  else {
      if (password.length < 8) {
        passwordError = "Password must be at least 8 characters long";
      } else if ( !password.match( passw ) ) {
         passwordError = "Give me strong password";
      }
    } */

    if (textError || emailError || passwordError) {
      setTextError(textError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (text && password && email) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: text,
            photoURL:"assets/avatar.png",
          })
            .then(() => {
              // Sign Up
              const user = userCredential.user;
              toast.success(
                "Registation is successful Please check your mail for veryfication"
              );
              setLoading(false);
              sendEmailVerification( auth.currentUser );
              dispatch(allUsers(user));
              localStorage.setItem("userLoginInfo", JSON.stringify(user));
              setTimeout(() => {
                navigate("/login");
              }, 2000);
              if (isValid) {
                setText("");
                setEmail("");
                setPassword("");
              }
            })
            .then(() => {
              const user = userCredential.user;
              console.log(user);
              set(ref(db, "users/" + user.uid), {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
                userId:user.uid,
              });
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorMessage.includes("auth/email-already-in-use")) {
            setEmailError("Email Already in use");
          }
          if (errorMessage.includes("auth/weak-password")) {
            setPasswordError("Password is weak");
          }
          setLoading(false);
        });
    }
  };
  return (
    <div className="">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Flex className="justify-center items-center  max-sm:mx-5 max-sm:mt-10 sm:max-md:mt-[150px] h-screen">
        <div className="w-[500px] lg:max-xl:pb-5 lg:max-xl:mt-16">
          <div className="text-center sm:max-md:mt-10">
            <Images className="mx-auto" imgsrc="assets/logo.png" />
          </div>
          <div className=" lg:max-xl:mt-5 lg:max-xl:mb-10 mb-16 max-sm:mb-6 max-sm:mt-6 text-center mt-11 sm:max-md:my-5 sm:max-md:mb-8">
            <h2 className=" lg:max-xl:mt-5 font-bold font-nunito text-sec text-[34px] max-sm:text-3xl">
              Get started with easily register
            </h2>
            <p className="font-normal font-nunito text-sec/50 text-xl max-sm:text-base max-sm:mt-3">
              Free register and you can enjoy it
            </p>
          </div>
          <InputBox
            type="email"
            label="Email Address"
            onChange={handleEmail}
            value={ email }
            name={email}
          />
          {emailError && (
            <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">
              {emailError}
            </p>
          )}
          <InputBox
            type="text"
            label="Full name"
            onChange={handleFullname}
            value={text}
          />
          {textError && (
            <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">
              {textError}
            </p>
          )}
          <InputBox
            type="text"
            label="Password"
            onChange={handlePassword}
            value={password}
          />
          {passwordError && (
            <p className="bg-red-600 text-white mb-6 -mt-3 p-2.5">
              {passwordError}
            </p>
          )}

          {loading ? (
            <button className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full rounded-full flex justify-center">
              <ProgressBar
                height="70"
                width="70"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor="#F4442E"
                barColor="#fff"
              />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full py-5 rounded-full"
            >
              Sign Up
            </button>
          )}

          <p className="text-center my-5">
            Already Have An Account ?{" "}
            <Link to="/" className="text-primary font-bold font-nunito ">
              Sign In
            </Link>
          </p>
        </div>
      </Flex>
    </div>
  );
};

export default Registation;
