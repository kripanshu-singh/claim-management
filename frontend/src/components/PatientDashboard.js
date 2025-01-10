import React, { useEffect, useState } from "react";
import {
  ArrowRightOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Space, message, Avatar, Card } from "antd";
import styled from "styled-components";
import TableListing from "./TableListing.js";
import { useSession } from "../context/session.js";
import claimApi from "../api/claimApi.js";
import { Link, useNavigate } from "react-router-dom";
import { AntDesignOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";

const { Meta } = Card;
const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(
        .${prefixCls}-btn-dangerous
      ) {
      > span {
        position: relative;
        font-weight: 500;
      }

      &::before {
        content: "";
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

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

  .spaceDiv {
    // height: -webkit-fill-available;
    .gradient-button {
      flex: 1; /* Let the button grow to fill available space */
      height: 100%; /* Take full height of parent */
      aspect-ratio: 2 / 1; /* Makes it a square */
      display: flex;
      justify-content: center;
      width: 150%;
      font-size: 1.5rem;
      align-items: center; /* Center content inside the button */
    }
  }
`;

const PatientDashboard = () => {
  const { styles } = useStyle();
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

  const formatted = formatDate("2025-01-08T08:19:51.863Z");
  console.log(formatted); // Output: "08 Jan 2025"

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
        {/* <div className="" style={{ margin: "auto", border: "1px solid black" }}>
          <Link to="/raise_claim">
            <ArrowRightOutlined style={{ fontSize: "250px" }} />
          </Link>
        </div> */}
        <ConfigProvider
          button={{
            className: styles.linearGradientButton,
          }}
        >
          {/* <Space className="spaceDiv"> */}
          <Link to="/raise_claim">
            <Button
              className="gradient-button"
              type="primary"
              size="large"
              // icon={}
            >
              Claim Insurence &nbsp;
              <ArrowRightOutlined />
            </Button>
            {/* <Button size="large">Button</Button> */}
          </Link>
          {/* </Space> */}
        </ConfigProvider>
      </StyledContainer>
      <TableListing dataSource={claims} />
    </>
  );
};
export default PatientDashboard;
