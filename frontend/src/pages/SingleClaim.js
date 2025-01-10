import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, message, Tag } from "antd";
import FileViewer from "react-file-viewer"; // Import FileViewer
import claimApi from "../api/claimApi.js";
import { useSession } from "../context/session.js"; // Assuming user role is stored in session
import { Input } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import ClaimActions from "../utils/UpdateClaim.js";

const { TextArea } = Input;
const SingleClaim = () => {
  const { id } = useParams();
  const { userObject } = useSession(); // Get user data from context/session
  console.log(`\n ~ SingleClaim ~ userObject :- `, userObject);

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
    <>
      <Card
        title={
          <span>
            <span style={{ fontWeight: "400", color: "#8c8c8c" }}>
              Claim Details for{" "}
            </span>
            <br />
            <span style={{ fontWeight: "bold", fontSize: "20px", color: "#000" }}>
              {claim.name}
            </span>
          </span>
        }
        style={{ width: "80%", margin: "20px auto" }}
      >
        <p>
          <strong>Description:</strong> {claim.description}
        </p>
        <p>
          <strong>Claimed Amount:</strong> ₹{claim.claimAmount}
        </p>
        <p>
          <strong>Approved Amount:</strong> ₹{claim.approvedAmount}
        </p>
        <p>
          <strong>Status:</strong> {getStatusTag(claim.status)}
        </p>
        <p>
          <strong>Submission Date:</strong> {claim.submissionDate}
        </p>
        <p>
          <strong>Email:</strong> {claim.email}
        </p>
        <p>
          <strong>Insurer Comments:</strong> {claim.insurerComments || "N/A"}
        </p>

        {claim.documentUrl ? (
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h3>Document Preview:</h3>
            {!previewError ? (
              <FileViewer
                fileType={getFileType(claim.documentUrl)} // Determine the file type from the URL
                filePath={claim.documentUrl} // Document URL
                onError={handlePreviewError} // Handle errors
              />
            ) : (
              <p style={{ color: "red" }}>
                Unable to preview the document. You can download it{" "}
                <a
                  href={claim.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </p>
            )}
          </div>
        ) : (
          <p>No document provided.</p>
        )}

        {/* Conditionally render buttons */}
        {isInsurerAndPending &&
          (console.log(`\n ~ SingleClaim ~ isInsurerAndPending :- `, claim._id),
          (
            <>
              <ClaimActions
                claimId={claim?._id}
                initialStatus={claim?.status}
              />
            </>
          ))}
      </Card>
    </>
  );
};

export default SingleClaim;
