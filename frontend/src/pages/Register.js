import styled from "styled-components";
import { Button, Form, Input, notification } from "antd";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";

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

// Styled container for centering the form
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80dvh; // Full height for better vertical centering

  .emailLabel {
    justify-content: left;
  }
`;

const Register = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate(); // Hook to handle navigation
  const { sendToContext } = useSession(); // Get session context function
  const [form] = Form.useForm(); // Form hook for managing form state

  const onFinish = async (values) => {
    try {
      // Attempt to register the user
      const response = await claimApi.registerUser(values);
      console.log("Registration response:", response);

      // Store relevant data in context (if needed)
      sendToContext(response);

      // Redirect to dashboard after successful registration
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
    <StyledContainer>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        {/* Username input */}
        <Form.Item
          name="name"
          label="Username"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Email input */}
        <Form.Item
          className="emailLabel"
          name="email"
          label="E-mail"
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
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        {/* Submit button */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>

        {/* Link to login page */}
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </Form>
    </StyledContainer>
  );
};

export default Register;
