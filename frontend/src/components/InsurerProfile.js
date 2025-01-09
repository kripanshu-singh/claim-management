import React from "react";
import { Tooltip, Avatar } from "antd";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const generateRandomColor = (
  str,
  bgColor,
  s = 30,
  l = 60,
  transparency = 100,
) => {
  if (bgColor) return bgColor;
  if (!str) return "#000000"; // Default color if no string

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // Generate hash from the string
  }

  const h = hash % 360; // Hue based on the hash
  return `hsl(${h}, ${s}%, ${l}%, ${transparency}%)`; // Return HSL color
};

const InsurerProfile = ({ insurerId }) => {
  console.log(`\n ~ InsurerProfile ~ insurerId :- `, insurerId);

  const { name = "N/A" } = insurerId || {}; // Destructure name or fallback to "N/A"
  const [firstName, lastName] = name.split(" "); // Split name into first and last name (if exists)

  const insurerName = name || "N/A"; // Display name or fallback to "N/A"

  // Simple hash function to generate a number from the name
  const generateColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i); // Hashing the name string
      hash |= 0; // Convert to 32bit integer
    }
    const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
      (hash >> 16) &
      0xff
    )
      .toString(16)
      .padStart(2, "0")}${((hash >> 8) & 0xff).toString(16).padStart(2, "0")}`;
    return color;
  };

  // Generate a color from the name
  const randomColor = generateColorFromName(name);

  // Display initials: First letter of first name + First letter of last name
  const avatarText = `${firstName.charAt(0)}${
    lastName ? lastName.charAt(0) : ""
  }`;

  return (
    <Tooltip title={name}>
      <div
        style={{
          backgroundColor: randomColor,
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textTransform: "uppercase",
        }}
      >
        {avatarText} {/* Display initials */}
      </div>
    </Tooltip>
  );
};

export default InsurerProfile;
