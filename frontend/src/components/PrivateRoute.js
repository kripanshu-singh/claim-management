import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSession } from "../context/session.js";
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";

const PrivateRoute = () => {
  const { accessToken, userLogOut } = useSession();
  useEffect(() => {
    if (!accessToken) {
      userLogOut(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateRoute;
