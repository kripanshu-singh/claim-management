import React from "react";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

// const StyledButton = styled(Button)`
//   background-color: red;
//   &:hover {
//     background-color: blue;
//   }
// `;

const Login = () => {
  const navigate = useNavigate();
  const { sendToContext } = useSession();
  const onFinish = async (values) => {
    const response = await claimApi.loginUser(values);
    sendToContext(response);
    navigate("/");
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <StyledContainer>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <small>
          Don't have an account?
          <Link to="/register"> Sign Up</Link>
        </small>
      </Form>
    </StyledContainer>
  );
};
export default Login;
