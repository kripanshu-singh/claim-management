import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/session.js";

const Home = () => {
  const { userObject, accessToken } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect based on the presence of accessToken
    if (accessToken) {
      navigate("/dashboard"); // Redirect to the dashboard if accessToken exists
    } else {
      navigate("/login"); // Redirect to login if accessToken doesn't exist
    }
  }, [accessToken, navigate]);

  return (
    <div>
      {/* <h1>Hello {userObject?.name}</h1>
      <h2>You are a {userObject?.role}</h2> */}
    </div>
  );
};

export default Home;
