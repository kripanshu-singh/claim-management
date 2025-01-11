import React from "react";
import { Table, Tag } from "antd";
import { Link } from "react-router-dom"; // Import Link
import InsurerProfile from "../components/InsurerProfile.js";
import styled from "styled-components";

const StyledTable = styled(Table)`
  height: calc(100% - 75px) !important;
  overflow: auto !important;
`;

const columns = [
  {
    title: "Description",
    dataIndex: "description",
    key: "_id",
    render: (
      text,
      record, // Access the record
    ) => (
      <div
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Link to={`/claims/${record._id}`}>{text}</Link>
      </div>
    ),
  },
  {
    title: "Claimed Amount",
    dataIndex: "claimAmount",
    key: "_id",
    render: (amount) => (
      <span style={{ justifyContent: "center", display: "flex" }}>
        ₹{amount}
      </span>
    ),
  },
  {
    title: "Approved Amount",
    dataIndex: "approvedAmount",
    key: "_id",
    render: (amount) => (
      <span style={{ justifyContent: "center", display: "flex" }}>
        ₹{amount}
      </span>
    ),
  },
  {
    title: "Status",
    key: "_id",
    dataIndex: "status",
    render: (status) => {
      let color =
        status === "pending"
          ? "geekblue"
          : status === "rejected"
          ? "volcano"
          : "green";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Claimed Date",
    dataIndex: "submissionDate",
    key: "_id",
  },
  {
    title: "Insured By",
    dataIndex: "insurerId", // We are now referencing the entire insurerId object
    key: "_id",
    render: (insurerId) => {
      // Assuming insurerId contains the full name, split it into first and last name
      const { name = "" } = insurerId || {}; // Access insurerId object
      const [firstName, lastName] = name.split(" "); // Split name into first and last name

      return insurerId ? (
        <>
          <InsurerProfile insurerId={insurerId} />{" "}
        </>
      ) : (
        "-" // If insurerId is missing, return "N/A"
      );
    },
  },
];

const TableListing = ({ dataSource }) => {
  if (!dataSource) {
    return <div style={{ height: "calc( 100% - 75px)" }} />;
  }

  return (
    <>
      <StyledTable
        rowKey={(data) => data._id}
        pagination={false}
        columns={columns}
        dataSource={[...dataSource]}
        sticky
      />
    </>
  );
};

export default TableListing;
