import React, { useState } from "react";
import { Button, Input, message } from "antd";
import claimApi from "../api/claimApi.js"; // Import your claim API

const { TextArea } = Input;

const ClaimActions = ({ claimId, initialStatus }) => {
  const [insurerComments, setInsurerComments] = useState(""); // TextArea value
  const [approvedAmount, setApprovedAmount] = useState(""); // Input number value
  const [isClaimProcessed, setIsClaimProcessed] = useState(false); // To track if the claim has been processed

  // Disable/Hide actions if the claim is already approved or rejected
  const isDisabled =
    isClaimProcessed ||
    initialStatus === "approved" ||
    initialStatus === "rejected";

  const handleApprove = async () => {
    const payload = {
      status: "approved",
      insurerComments, // Add insurer comments from the TextArea
      approvedAmount: parseFloat(approvedAmount), // Ensure the amount is a number
    };

    try {
      await claimApi.updateClaim(claimId, payload);
      message.success("Claim approved successfully!");
      setIsClaimProcessed(true); // Mark claim as processed
    } catch (error) {
      console.error("Error updating claim:", error);
      message.error("Failed to approve the claim");
    }
  };

  const handleReject = async () => {
    const payload = {
      status: "rejected",
      insurerComments, // Add insurer comments from the TextArea
      approvedAmount: 0, // Rejecting the claim will have 0 approved amount
    };

    try {
      await claimApi.updateClaim(claimId, payload);
      message.success("Claim rejected successfully!");
      setIsClaimProcessed(true); // Mark claim as processed
    } catch (error) {
      console.error("Error updating claim:", error);
      message.error("Failed to reject the claim");
    }
  };

  return (
    <div>
      <TextArea
        rows={4}
        placeholder="Any message for claimer"
        value={insurerComments}
        onChange={(e) => setInsurerComments(e.target.value)}
        disabled={isDisabled} // Disable TextArea if the claim is processed
        style={{ marginBottom: "10px" }}
      />
      <Input
        prefix="₹"
        suffix="INR"
        type="number"
        size="large"
        value={approvedAmount}
        onChange={(e) => setApprovedAmount(e.target.value)}
        disabled={isDisabled} // Disable Input field if the claim is processed
      />
      <Button
        type="primary"
        onClick={handleApprove}
        style={{ marginTop: "10px" }}
        disabled={isDisabled} // Disable button if the claim is processed
      >
        Approve
      </Button>
      <Button
        type="primary"
        danger
        onClick={handleReject}
        style={{ marginTop: "10px", marginLeft: "10px" }}
        disabled={isDisabled} // Disable button if the claim is processed
      >
        Reject
      </Button>
    </div>
  );
};

export default ClaimActions;
