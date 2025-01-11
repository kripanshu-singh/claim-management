import React from "react";
import { Spin } from 'antd';
import styled from "styled-components";

const StyledSpin = styled(Spin)`
  height: calc( 100dvh - 134px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = () => {
    return (
        <StyledSpin spinning size="large" />
    );
};

export default Spinner;
