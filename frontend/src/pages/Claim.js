import React, { useState } from "react";
import { Button, Input, InputNumber, message, notification, Form } from "antd";
import styled from "styled-components";
import claimApi from "../api/claimApi.js";
import { useNavigate } from "react-router-dom";
import UploadDocument from "../components/UploadDocument.js";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100dvh - 134px);
  .ant-upload-wrapper {
    align-self: center;
  }
`;

const StyledCard = styled.div`
  border: 1px solid #a7a7a7;
  border-radius: 8px;
  padding: 20px;
  height: calc(100% - 82px);
  width: 70%;
  .ant-card-head {
    border-bottom: 1px solid #acacac;
    padding-bottom: 20px;
  }
  .ant-card-body {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: calc(100% - 55px);
    overflow: auto;
  }
  .claim-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
`;

const Claim = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitClaim = async () => {
    setLoading(true);

    if (!document) {
      message.error("Please upload a document.");
      setLoading(false);
      return;
    }

    const payload = {
      name,
      email,
      claimAmount,
      description,
      document,
    };

    try {
      const response = await claimApi.submitClaim(payload);
      api.success({
        message: "Logedin successful",
        description: response?.message || "You successfully logedin.", // Error message from backend
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting claim:", error);
      api.error({
        message: "Registration Failed",
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.", // Error message from backend
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDocumentChange = (url) => {
    form.setFieldsValue({ document: url });
    setDocument(url);
  };

  return (
    <StyledContainer>
      {contextHolder}
      <StyledCard>
        <div className="ant-card-head">
          <span style={{ fontWeight: "400", fontSize: "20px", color: "#000" }}>
            Submit Claim
          </span>
        </div>
        <div className="ant-card-body">
          <Form
            className="claim-form"
            name="basic"
            labelCol={{
              span: 8,
            }}
            onFinish={submitClaim}
            form={form}
            style={{ marginLeft: "-250px" }}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                placeholder="Name"
                id="error"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Form.Item>

            <Form.Item
              name={["user", "email"]}
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name={["claimAmount"]}
              label="Claim Amount"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Please input your Claim Amount!",
                },
              ]}
            >
              <InputNumber
                placeholder="Claim Amount"
                value={claimAmount}
                type="number"
                onChange={(value) => setClaimAmount(value)}
                required
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name={["user", "introduction"]}
              label="Description"
              rules={[
                { required: true, message: "Please input your description!" },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="document"
              label="Upload"
              rules={[
                {
                  required: true,
                  message: "Please upload relevant document!",
                },
              ]}
              valuePropName="document"
            >
              <UploadDocument setDocument={handleDocumentChange} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 6,
                span: 16,
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "15%",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginTop: "1rem" }}
              >
                Submit Claim
              </Button>
            </Form.Item>
          </Form>
        </div>
      </StyledCard>
    </StyledContainer>
  );
};

export default Claim;
