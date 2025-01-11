import styled from "styled-components";
import { Button, Form, Input, notification } from "antd";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/register_image.png";
import React from "react";

// Layout configuration for Ant Design form
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 134px);
  background-color: #f0f2f5; // Light background color
  font-family: "Poppins", sans-serif; // Apply Poppins font globally
`;

const CardContainer = styled.div`
  transform: scale(1.1);
  display: flex;
  flex-direction: row; // Align image and form side-by-side
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1); // Card shadow
  border-radius: 8px;
  padding: 40px;
  gap: 20px;
  max-width: 900px;
  width: 100%;
  margin: auto;

  @media (max-width: 768px) {
    flex-direction: column; // Stack image and form on smaller screens
    text-align: center;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1; // Take available space
`;

const StyledForm = styled(Form)`
  max-width: 400px;

  .ant-form-item {
    // margin-bottom: 16px;
  }

  button {
    // width: 10%;
    margin: auto;
  }
`;

const ImageContainer = styled.div`
  flex: 1; // Take available space
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const Register = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate(); // Hook to handle navigation
  const { sendToContext } = useSession(); // Get session context function
  const [form] = Form.useForm(); // Form hook for managing form state

  const onFinish = async (values) => {
    try {
      // Attempt to register the user
      setLoading(true);
      const response = await claimApi.registerUser(values);

      // Store relevant data in context (if needed)
      sendToContext(response);

      // Redirect to dashboard after successful registration
      setLoading(false);
      navigate("/dashboard");

      // Handle successful registration
      api.success({
        message: "Registration successful",
        description: response?.message || "You successfully registered.", // Error message from backend
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
    <MainContainer>
      <CardContainer>
        {/* Left: Image Section */}
        <ImageContainer>
          <img src={image} alt="signup" style={{ width: "320px" }} />
        </ImageContainer>

        {/* Right: Form Section */}
        <FormContainer>
          {contextHolder}
          <StyledForm
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            {/* Username input */}
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Email input */}
            <Form.Item
              name="email"
              label="Email address"
              rules={[
                { type: "email", message: "The input is not a valid E-mail!" },
                { required: true, message: "Please input your E-mail!" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* Password input */}
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "220px" }}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>

            {/* Link to login page */}
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </StyledForm>
        </FormContainer>
      </CardContainer>
    </MainContainer>
  );
};

export default Register;
