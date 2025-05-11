import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/session.js";
import { Spin } from "antd";
import styled from "styled-components";
import claimApi from "../api/claimApi.js";
import axios from "axios";

const StyledSpin = styled(Spin)`
  height: calc(100dvh - 134px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  let baseURL = process.env.REACT_APP_BASE_URL;

  const { accessToken } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/users/health`);

    if (accessToken) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return <StyledSpin spinning size="large" />;
};

export default Home;
