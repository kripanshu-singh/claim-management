import React from "react";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";
import js_cookie from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();
  const { userLogOut } = useSession();
  js_cookie.remove("accessToken");
  js_cookie.remove("refreshToken");

  userLogOut();
  navigate("/");

  return <div>Logout</div>;
};

export default Logout;
