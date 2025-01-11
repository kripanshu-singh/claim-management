import React from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../assets/logo.svg";
import { useSession } from "../context/session.js";
import { Button } from "antd";
import claimApi from "../api/claimApi.js";
import back from "../assets/back.svg";
import { logoPath } from "./constant.js";

const StyledContainer = styled.div`
  height: 66px;
  position: relative;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
`;
const StyledLogo = styled(LogoSvg)`
  width: 80px; /* Set the width */
  height: auto; /* Maintain aspect ratio */
`;

const InnerContainer = styled.div`
  width: 97%;
  font-size: 0.9rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .navbar-first{
    padding-left: 12px;
    width: 130px;
  }
  .logoandname {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .auth-buttons {
    display: flex;
    gap: 16px;
  }
  .back-button{
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .back-text{
    font-size: 18px;
  }
`;

const Menu = styled.ul`
  display: none;

  @media (min-width: 1024px) {
    display: inline-flex;
    gap: 22px;
  }
  li {
    list-style: none;
    padding: 0rem 1.25rem;
  }
  a {
    font-weight: 800;
    color: #4b5563;
    text-decoration: none;
    &:hover {
      color: #374151;
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogOut, accessToken } = useSession();
  const handleLogout = async () => {
    await userLogOut(); // Perform session cleanup
  };

  const menuItems = [
    ...(accessToken ? [{ name: "Home", href: "/" }] : []), // Add "Home" only if accessToken exists
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <StyledContainer>
      <InnerContainer>
        <div className="navbar-first">
          {logoPath.includes(location.pathname) ? (
            <Link to="/" className="logoandname">
              <LogoSvg style={{ width: "46px", height: "auto" }} />
              <span style={{ fontWeight: "bold" }}>
                Claim App
              </span>
            </Link>
          ) : (
            <div className="back-button" onClick={() => navigate(-1)}>
              <img src={back} style={{ width: "40px", height: "auto" }} />
              <span className="back-text">Back</span>
            </div>
          )}
        </div>
        <Menu>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link to={item.href}>{item.name}</Link>
            </li>
          ))}
        </Menu>

        {!accessToken ? (
          <div className="auth-buttons">
            <Button>
              <Link to="/login" style={{ color: "inherit" }}>
                Login
              </Link>
            </Button>
            <Link to="/register" style={{ color: "inherit" }}>
              <Button>Register</Button>
            </Link>
          </div>
        ) : (
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        )}
      </InnerContainer>
    </StyledContainer>
  );
};

export default Navbar;
