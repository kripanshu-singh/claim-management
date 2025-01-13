import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSession } from "../context/session.js";
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";
import js_cookie from "js-cookie";

const PrivateRoute = () => {
  const { userLogOut } = useSession();
  useEffect(() => {
    const accessToken = js_cookie.get("accessToken")
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
