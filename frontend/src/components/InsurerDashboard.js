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

const { Meta } = Card;

const StyledContainer = styled.div`
  display: flex;
  padding: 20px;
  justify-content: flex-end;
  gap: 80px;
  align-items: stretch; /* Correct spelling for stretch */
  height: 100%; /* Ensures container takes full available height */

  .userNmae {
    position: absolute;
    top: 70px;
    left: 30px;
  }
`;

const filtersDiv = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
`;

const InsurerDashboard = () => {
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
      const response = await claimApi.getAllClaims();
      console.log(`\n ~ fetchClaims ~ response :- `, response);

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

  console.log(`\n ~ InsurerDashboard ~ claims :- `, claims);
  useEffect(() => {
    fetchClaims();
  }, []);
  return (
    <>
      {!claims && (
        <div>
          <TableSkeleton />
          {/* Loading... */}
        </div>
      )}
      {claims && (
        <>
          <StyledContainer className="">
            <h2 className="userNmae">
              Welcome, {userObject?.name},
              <br /> {dayName}, {month} {date} {year}
            </h2>
            <Card
              style={{
                width: 300,
                //   margin: "auto",
              }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            {/* <div
              className=""
              style={{ margin: "auto", border: "1px solid black" }}
            >
              <ArrowRightOutlined style={{ fontSize: "250px" }} />
            </div> */}
          </StyledContainer>
          <Filters
            setClaims={setClaims}
            open={open}
            setOpen={setOpen}
            listData={listData}
          />
          <TableListing dataSource={[...claims]} />
        </>
      )}
    </>
  );
};
export default InsurerDashboard;
