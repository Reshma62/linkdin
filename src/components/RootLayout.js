import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Registation from "../pages/Registation";

const RootLayout = () => {
  return (
    <>
      <Login />
      {/* <Outlet/> */}
      {/* <Registation /> */}
    </>
  );
};

export default RootLayout;
