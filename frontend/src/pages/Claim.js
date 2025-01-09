import React, { useState } from "react";
import { Button, Input, InputNumber, message } from "antd";
import styled from "styled-components";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Claim = () => {
  const navigate = useNavigate();
  const { sendToContext } = useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [description, setDescription] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setDocument(file);
  };

  const submitClaim = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!document) {
      message.error("Please upload a document.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("claimAmount", claimAmount);
    formData.append("description", description);
    formData.append("document", document);

    try {
      const response = await claimApi.submitClaim(formData);
      message.success("Claim submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error submitting claim:", error);
      message.error(error.response?.data?.message || "Error submitting claim");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledContainer>
      <form className="form claim-form" onSubmit={submitClaim}>
        <h2>Submit Claim</h2>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <InputNumber
          placeholder="Claim Amount"
          value={claimAmount}
          type="number"
          onChange={(value) => setClaimAmount(value)}
          required
          style={{ width: "100%" }}
        />
        <TextArea
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,application/pdf"
          required
        />

        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          style={{ marginTop: "1rem" }}
        >
          Submit Claim
        </Button>
      </form>
    </StyledContainer>
  );
};

export default Claim;
