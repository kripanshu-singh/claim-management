import React from "react";
import { Button, Form, Input, notification } from "antd";
import styled from "styled-components";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh;
`;

const Login = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const { sendToContext } = useSession();

  const onFinish = async (values) => {
    try {
      // Attempt to register the user

      const response = await claimApi.loginUser(values);

      // Store relevant data in context (if needed)
      sendToContext(response);

      // Redirect to dashboard after successful registration
      navigate("/dashboard");

      // Handle successful registration
      api.success({
        message: "Logedin successful",
        description: response?.message || "You successfully logedin.", // Error message from backend
      });
    } catch (error) {
      console.log("Error response:", error?.response?.data?.message);

      // If an error occurs (e.g., user already exists)
      api.error({
        message: "Registration Failed",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.", // Error message from backend
      });
    }
  };
  return (
    <StyledContainer>
      {contextHolder}
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
        // onFinishFailed={onFinishFailed}
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
