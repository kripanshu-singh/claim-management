import React, { useEffect, useState } from "react";
import {
  ArrowRightOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, message } from "antd";
import styled from "styled-components";
import TableListing from "./TableListing.js";
import { useSession } from "../context/session.js";
import { useNavigate } from "react-router-dom";
import claimApi from "../api/claimApi.js";
import Filters from "../components/Filters/index.js";
import TableSkeleton from "./TableSkeleton.js";
import ProjectStatus from "./ProjectStatus.js";
import { getTaskSummary } from "./helper.js";
import Welcome from "./Welcome.js";

const { Meta } = Card;

const StyledContainer = styled.div`
display: flex;
height: calc( 100dvh - 134px);
`;

const StyledDashboardContainer = styled.div`
display: flex;
.dateContainer{
  display: flex;
  flex-direction: column;
  flex :1;
  margin: 20px;
}
.tableContainer{
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 8px;
  padding: 16px;
  margin: 20px;
  width: 68%;
  margin-left: 0px;
}
`;

const PatientDashboard = () => {
  const { userObject } = useSession();
  const now = new Date(Date.now());

  // Convert to IST (Indian Standard Time)
  const options = {
    timeZone: "Asia/Kolkata",
    weekday: "long", // Day name
    day: "2-digit", // Date
    month: "long", // Month (full text)
    year: "numeric", // Year
  };
  const formatter = new Intl.DateTimeFormat("en-IN", options);
  const formattedDate = formatter.format(now);
  const [dayName, month, date, year] = formattedDate.split(" ");
  const navigate = useNavigate();
  const { sendToContext } = useSession();
  const [loading, setLoading] = useState(false); // Add loading state
  const [claims, setClaims] = useState(null);
  const [listData, setListData] = useState(null);
  const [open, setOpen] = useState("");

  function formatDate(dateString) {
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    };
    const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString),
    );
    return formattedDate.replace(",", ""); // Removes any commas if present
  }

  const fetchClaims = async () => {
    try {
      const response = await claimApi.getPatientClaims();
      if (response?.claims) {
        // Ensure each claim has a unique key
        const claimsWithKeys = response.claims.map((claim, index) => ({
          ...claim,
          key: claim.id || index, // Use a unique field or fallback to the index
          submissionDate: formatDate(claim.submissionDate),
        }));
        setClaims(claimsWithKeys);
        setListData(claimsWithKeys);
        message.success("Claims fetched successfully!");
      } else {
        message.error("Failed to fetch claims: Invalid response data.");
      }
    } catch (error) {
      console.error("Error fetching claims:", error);
      message.error(error.response?.data?.message || "Error fetching claims");
    }
  };

  useEffect(() => {
    fetchClaims();
  }, []);
  return (
    <StyledContainer>
      {!claims && (
        <div>
          <TableSkeleton />
          {/* Loading... */}
        </div>
      )}
      {claims && (
        <StyledDashboardContainer>
          <div className="dateContainer">
            <Welcome name={userObject?.name} />
            <ProjectStatus taskDetailData={getTaskSummary(listData)} />
          </div>
          <div className="tableContainer">
            <Filters
              setClaims={setClaims}
              open={open}
              setOpen={setOpen}
              listData={listData}
            />
            <TableListing dataSource={[...claims]} />
          </div>
        </StyledDashboardContainer>
      )}
    </StyledContainer>
  );
};
export default PatientDashboard;
