import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, message, Tag, Image } from "antd";
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js"; // Assuming user role is stored in session
import { Input } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import ClaimActions from "../utils/UpdateClaim.js";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  height: calc( 100dvh - 134px);
  align-items: center;
  justify-content: center;
`;

const StyledCard = styled.div`
  border: 1px solid #a7a7a7;
  border-radius: 8px;
  padding: 20px;
  height: calc(100% - 82px);
  width: 70%;
 .ant-card-head{
  border-bottom: 1px solid #acacac;
  padding-bottom: 20px;
 }
 .ant-card-body{
  display: flex;
  flex-direction: column;
  height: calc(100% - 55px);
  overflow: auto;
 }
 .all-p-tag{
  /* margin: 4px; */
 }
`;

const { TextArea } = Input;
const SingleClaim = () => {
  const { id } = useParams();
  const { userObject } = useSession(); // Get user data from context/session

  const [claim, setClaim] = useState(null);
  const [previewError, setPreviewError] = useState(false);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString),
    );
  };

  // Fetch claim by ID
  const fetchClaimById = async () => {
    try {
      const response = await claimApi.getClaimById(id);
      if (response?.claim) {
        const formattedClaim = {
          ...response.claim,
          submissionDate: formatDate(response.claim.submissionDate), // Format the date
        };
        setClaim(formattedClaim);
        message.success("Claim fetched successfully!");
      } else {
        message.error("Failed to fetch claim: Invalid response data.");
      }
    } catch (error) {
      console.error("Error fetching claim:", error);
      message.error(error.response?.data?.message || "Error fetching claim");
    }
  };

  useEffect(() => {
    fetchClaimById();
  }, [id]);

  if (!claim) {
    return <div>Loading...</div>;
  }

  const handlePreviewError = (e) => {
    console.error("Error previewing document:", e);
    setPreviewError(true);
  };

  const getFileType = (url) => {
    const extension = url.split(".").pop();
    return extension.toLowerCase();
  };

  const getStatusTag = (status) => {
    const color =
      status === "pending"
        ? "geekblue"
        : status === "rejected"
          ? "volcano"
          : "green"; // Default to green for approved
    return <Tag color={color}>{status.toUpperCase()}</Tag>;
  };

  // Check if userObject is "insurer" and claim status is "pending"
  const isInsurerAndPending =
    userObject?.role === "insurer" && claim.status === "pending";

  return (
    <StyledContainer>
      <StyledCard>
        <div className="ant-card-head">
          <span>
            <span style={{ fontWeight: "400", color: "#8c8c8c" }}>
              Claim Details for{" "}:{" "}
            </span>
            <span style={{ fontWeight: "400", fontSize: "20px", color: "#000" }}>
              {claim.name}
            </span>
          </span>
        </div>
        <div className="ant-card-body">
          <p className="all-p-tag">
            <strong>Description:</strong> {claim.description}
          </p>
          <p className="all-p-tag">
            <strong>Claimed Amount:</strong> ₹{claim.claimAmount}
          </p>
          <p className="all-p-tag">
            <strong>Approved Amount:</strong> ₹{claim.approvedAmount}
          </p>
          <p className="all-p-tag">
            <strong>Status:</strong> {getStatusTag(claim.status)}
          </p>
          <p className="all-p-tag">
            <strong>Submission Date:</strong> {claim.submissionDate}
          </p>
          <p className="all-p-tag">
            <strong>Email:</strong> {claim.email}
          </p >
          {claim.insurerComments &&
            <p className="all-p-tag">
              <strong>Insurer Comments:</strong> {claim.insurerComments || "N/A"}
            </p>
          }
          {claim.documentUrl ? (
            <div style={{ marginBottom: "20px" }}>
              <h3>Document Preview:</h3>
              <Image
                width={200}
                src={claim.documentUrl}
              />
            </div>
          ) : (
            <p>No document provided.</p>
          )}

          {isInsurerAndPending &&
            (
              <>
                <ClaimActions
                  claimId={claim?._id}
                  initialStatus={claim?.status}
                />
              </>
            )}
        </div>

      </StyledCard>
    </StyledContainer>
  );
};

export default SingleClaim;
