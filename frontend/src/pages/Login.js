import React from "react";
import { Button, Form, Input, notification } from "antd";
import styled from "styled-components";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/signin_image.png";
// const MainContainer = styled.div`
//   // display: flex;
//   // height: calc(100dvh - 134px);

//   // width: -webkit-fill-available;
//   // display: flex;
//   // height: calc(100dvh - 134px);
//   // justify-content: center;
//   // flex-direction: column;
//   // padding: 40px;

//   margin: auto;
//   width: fit-content;
//   display: flex;
//   height: calc(100dvh - 134px);
//   justify-content: center;
//   flex-direction: column;
//   padding: 40px;
// `;
// const StyledContainer = styled.div`
//   // display: flex;
//   // justify-content: center;
//   // align-items: center;
//   // height: 80dvh;
//   .card_shadow {
//     width: 400px;
//     box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
//     transition: 0.3s;
//     border-radius: 5px; /* 5px rounded corners */
//     padding: 20px;
//   }
// `;

// import styled from "styled-components";

// const MainContainer = styled.div`
//   margin: auto;
//   width: fit-content;
//   display: flex;
//   height: calc(100dvh - 134px);
//   justify-content: center;
//   align-items: center; /* Center align the content vertically */
//   flex-direction: column;
//   padding: 40px;
// `;

// const CardShadow = styled.div`
//   background-color: #ffffff; /* Add a white background */
//   border-radius: 8px; /* Slightly rounded corners */
//   padding: 20px;
//   box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06); /* Subtle shadow for depth */
//   max-width: 400px; /* Limit card width */
//   width: 100%; /* Ensure responsiveness */
//   text-align: center; /* Center text alignment for the card */
// `;

// const StyledButton = styled(Button)`
//   background-color: red;
//   &:hover {
//     background-color: blue;
//   }
// `;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 134px); // Use min-height for better responsiveness
  padding: 40px;
  background-color: #f0f2f5; // Light background color like in the image
  font-family: "Poppins", sans-serif; // Apply Poppins font
`;

const CardContainer = styled.div`
  background-color: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); // Improved shadow
  width: 700px; // Set a fixed width for the card
  .formAndImage {
    display: flex;
    justify-content: space-around;
  }
`;

const StyledContainer = styled.div`
  margin-top: 24px; // Add some spacing between heading and form
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
    <>
      <MainContainer>
        <CardContainer>
          {/* Use the styled CardContainer */}
          <div className="formAndImage">
            <div className="">
              <h1>Login</h1>
              <StyledContainer>
                {contextHolder}
                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  style={{ maxWidth: "100%" }} // Make form responsive within the card
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your Email!" },
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
                    {" "}
                    {/* Center the button */}
                    <Button type="primary" htmlType="submit" block>
                      {" "}
                      {/* Block button for full width */}
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
      </MainContainer>
    </>
  );
};
export default Login;
