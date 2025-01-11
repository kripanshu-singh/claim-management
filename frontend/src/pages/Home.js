import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/session.js";
import { Spin } from 'antd';
import styled from "styled-components";

const StyledSpin = styled(Spin)`
  height: calc( 100dvh - 134px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const { accessToken } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <StyledSpin spinning size="large" />
  );
};

export default Home;
