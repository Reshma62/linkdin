import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Flex from "../components/Flex";
import Images from "../components/Images";
import InputBox from "../components/InputBox";
import { ProgressBar } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../slices/UserSlices";
const Login = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ passwordError, setPasswordError ] = useState( "" );

  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

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
    /* else {
      if (password.length < 8) {
        passwordError = "Password must be at least 8 characters long";
      } else if (!password.match(passw)) {
        passwordError = "Give me strong password";
      }
    } */

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success( "Login is successful Please wait for redriction" );
          dispatch( allUsers( user ) );
          localStorage.setItem("userLoginInfo", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
          }, 2000);
          if (isValid) {
            setEmail("");
            setPassword("");
          }

          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setLoading(false);
        });
    }
  };
  return (
    <Flex className="justify-center items-center h-screen max-sm:mx-5 max-sm:mt-10 sm:max-md:mt-[150px]">
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
      <div className="w-[500px] lg:max-xl:pb-5 lg:max-xl:mt-16">
        <div className="text-center sm:max-md:mt-10">
          <Images className="mx-auto" imgsrc="assets/logo.png" />
        </div>
        <div className=" lg:max-xl:mt-5 lg:max-xl:mb-10 mb-16 max-sm:mb-6 max-sm:mt-6 text-center mt-11 sm:max-md:my-5 sm:max-md:mb-8">
          <h2 className=" lg:max-xl:mt-5 font-bold font-nunito text-sec text-[34px] max-sm:text-3xl">
            Login
          </h2>
          <p className="font-normal font-nunito text-sec/50 text-xl max-sm:text-base max-sm:mt-3">
            Free register and you can enjoy it
          </p>
        </div>
        <InputBox
          type="email"
          label="Email Address"
          onChange={handleEmail}
          value={email}
        />
        {emailError && (
          <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">{emailError}</p>
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
            Sign In
          </button>
        )}
        <p className="text-center my-5">
          Don't Have Account ?{" "}
          <Link
            to="/registation"
            className="text-primary font-bold font-nunito "
          >
            Sign Up
          </Link>
        </p>
        <p className="text-center my-5">
          <Link
            to="/forgotpassword"
            className="text-primary font-bold font-nunito "
          >
            Forgot Password ?
          </Link>
        </p>
      </div>
    </Flex>
  );
};

export default Login;
