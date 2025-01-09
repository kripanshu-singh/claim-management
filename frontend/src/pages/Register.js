// import React, { use, useState } from "react";
import styled from "styled-components";
import { Button, Form, Input } from "antd";
import claimApi from "../api/claimApi.js";
// import { set } from "mongoose";
// import js_cookie from "js-cookie";
import { useSession } from "../context/session.js";
import { Link, useNavigate } from "react-router-dom";

//   {
//     value: "zhejiang",
//     label: "Zhejiang",
//     children: [
//       {
//         value: "hangzhou",
//         label: "Hangzhou",
//         children: [
//           {
//             value: "xihu",
//             label: "West Lake",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     value: "jiangsu",
//     label: "Jiangsu",
//     children: [
//       {
//         value: "nanjing",
//         label: "Nanjing",
//         children: [
//           {
//             value: "zhonghuamen",
//             label: "Zhong Hua Men",
//           },
//         ],
//       },
//     ],
//   },
// ];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Register = () => {
  const navigate = useNavigate();

  const { sendToContext } = useSession();

  const [form] = Form.useForm();
  console.log(`\n ~ Register ~ form :- `, form);

  const onFinish = async (values) => {
    const response = await claimApi.registerUser(values);
    sendToContext(response);
    navigate("/");
  };

  return (
    <>
      <StyledContainer>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Username"
            tooltip="What do you want others to call you?"
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

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
          <small>
            Already have an account?
            <Link to="/login"> Login</Link>
          </small>
        </Form>
      </StyledContainer>
    </>
  );
};
export default Register;
