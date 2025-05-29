import React, { useRef } from "react";
import { Button, Form, Input, notification, Alert, Tag } from "antd";
import { CopyOutlined, EyeOutlined } from "@ant-design/icons"; // Import Ant Design icons
import styled from "styled-components";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/signin_image.png";

// ==========================================================
// Styled Components
// ==========================================================

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // Adjusted height to make space for the test credentials card below or beside
  height: calc(-134px + 100vh); /* Slightly reduce height to fit more content or adjust as needed */
  background-color: #f0f2f5;
  font-family: "Poppins", sans-serif;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 30px; /* Space between login card and test credentials card */
`;

const CardContainer = styled.div`
  background-color: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 700px; /* Fixed width for the login card */
  flex-shrink: 0; /* Prevent shrinking when wrapped */

  .formAndImage {
    display: flex;
    justify-content: space-around;
    align-items: center; /* Vertically align items */
  }

  /* Adjustments for smaller screens */
  @media (max-width: 900px) {
    width: 95%; /* Make card take more width on smaller screens */
    .formAndImage {
      flex-direction: column-reverse; /* Stack image above form on small screens */
    }
  }
`;

const StyledContainer = styled.div`
  margin-top: 24px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

// NEW: Styled Components for Test Credentials Display
const TestCredentialsCard = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Slightly less shadow than login card */
  width: 380px; /* Fixed width for the test credentials card */
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 900px) {
    width: 95%; /* Make card take more width on smaller screens */
  }
`;

const TestTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const CredentialBox = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 16px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RoleTag = styled(Tag)`
  font-size: 14px;
  padding: 5px 10px;
  margin-bottom: 8px;
  border-radius: 4px;
  align-self: flex-start; /* Align tag to the start of the flex container */
`;

const CredentialItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const CredentialLabel = styled.span`
  font-weight: bold;
  color: #555;
  margin-right: 10px;
`;

const CredentialValue = styled.span`
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; /* Monospaced font for credentials */
  background-color: #e8e8e8;
  padding: 3px 8px;
  border-radius: 3px;
  user-select: all; /* Allow easy selection */
  word-break: break-all; /* Ensure long emails wrap */
`;

const CopyButton = styled(Button)`
  margin-left: 8px;
`;

const QuickFillButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

// ==========================================================
// Test Credentials Data
// ==========================================================

const testCredentials = {
  patient: {
    email: "rohan.singh@example.com",
    password: "R0h@nS!ngh#2025$",
  },
  insurer: {
    email: "anjali.gupta@example.com",
    password: "Anj@Gupt@#2025Mail",
  },
};

// ==========================================================
// Login Component
// ==========================================================

const Login = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { sendToContext } = useSession();
  const [form] = Form.useForm(); // Use form hook to get form instance

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await claimApi.loginUser(values);
      sendToContext(response);
      setLoading(false);
      navigate("/dashboard");
      api.success({
        message: "Logged in successfully",
        description: response?.message || "You have successfully logged in.",
      });
    } catch (error) {
      console.log("Error response:", error?.response?.data?.message);
      api.error({
        message: "Login Failed",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
      setLoading(false);
    }
  };

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        api.success({
          message: "Copied to Clipboard",
          description: `"${text}" copied successfully!`,
          duration: 1.5
        });
      })
      .catch((err) => {
        api.error({
          message: "Copy Failed",
          description: "Could not copy text. Please try manually.",
          duration: 2
        });
        console.error("Failed to copy: ", err);
      });
  };

  // Function to fill form fields
  const fillCredentials = (role) => {
    form.setFieldsValue({
      email: testCredentials[role].email,
      password: testCredentials[role].password,
    });
    api.info({
      message: "Credentials Filled",
      description: `Login form populated with ${role} credentials.`,
      duration: 2
    });
  };

  return (
    <>
      <MainContainer>
        {contextHolder} {/* Place context holder at the top level */}
        <CardContainer>
          <div className="formAndImage">
            <div className="">
              <h1>Login</h1>
              <StyledContainer>
                <Form
                  form={form} // Pass form instance to Ant Design Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: "100%" }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
                      { type: "email", message: "Please enter a valid email!" },
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
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={loading}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <small>
                      Don't have an account? <Link to="/register">Sign Up</Link>
                    </small>
                  </Form.Item>
                </Form>
              </StyledContainer>
            </div>
            <ImageContainer>
              <img src={image} alt="signup" style={{ width: "320px" }} />
            </ImageContainer>
          </div>
        </CardContainer>

        {/* NEW: Test Credentials Display Card */}
        <TestCredentialsCard>
          <Alert
          style={{padding:"16px"}}
            message="For Testing Purpose Only"
            description="Use these credentials to test different user roles in the application."
            type="info"
            showIcon
          />
          <CredentialBox>
            <RoleTag color="blue">👤 Patient Portal</RoleTag>
            <CredentialItem>
              <CredentialLabel>Email:</CredentialLabel>
              <div>
                <CredentialValue>{testCredentials.patient.email}</CredentialValue>
                <CopyButton
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={() => copyToClipboard(testCredentials.patient.email)}
                />
              </div>
            </CredentialItem>
            <CredentialItem>
              <CredentialLabel>Password:</CredentialLabel>
              <div>
                <CredentialValue>{testCredentials.patient.password}</CredentialValue>
                <CopyButton
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={() => copyToClipboard(testCredentials.patient.password)}
                />
              </div>
            </CredentialItem>
            <QuickFillButton
              type="dashed"
              icon={<EyeOutlined />}
              onClick={() => fillCredentials('patient')}
            >
              Quick Fill Patient Login
            </QuickFillButton>
          </CredentialBox>
          <CredentialBox>
            <RoleTag color="green">🏥 Insurer Portal</RoleTag>
            <CredentialItem>
              <CredentialLabel>Email:</CredentialLabel>
              <div>
                <CredentialValue>{testCredentials.insurer.email}</CredentialValue>
                <CopyButton
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={() => copyToClipboard(testCredentials.insurer.email)}
                />
              </div>
            </CredentialItem>
            <CredentialItem>
              <CredentialLabel>Password:</CredentialLabel>
              <div>
                <CredentialValue>{testCredentials.insurer.password}</CredentialValue>
                <CopyButton
                  icon={<CopyOutlined />}
                  size="small"
                  onClick={() => copyToClipboard(testCredentials.insurer.password)}
                />
              </div>
            </CredentialItem>
            <QuickFillButton
              type="dashed"
              icon={<EyeOutlined />}
              onClick={() => fillCredentials('insurer')}
            >
              Quick Fill Insurer Login
            </QuickFillButton>
          </CredentialBox>
        </TestCredentialsCard>
      </MainContainer>
    </>
  );
};

export default Login;