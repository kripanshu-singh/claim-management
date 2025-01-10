import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../assets/logo.svg";
import { useSession } from "../context/session.js";
import { Button } from "antd";
import claimApi from "../api/claimApi.js";

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
  width: 90%;
  font-size: 0.9rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logoandname {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .auth-buttons {
    display: flex;
    gap: 16px;
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
  const navigate = useNavigate(); // Use the useNavigate hook for redirection
  const { userLogOut, accessToken } = useSession();
  const handleLogout = async () => {
    const response = await claimApi.logoutuser();
    await userLogOut(); // Perform session cleanup
    navigate("/login"); // Redirect to login page
  };
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    ...(accessToken ? [{ name: "Home", href: "/" }] : []), // Add "Home" only if accessToken exists
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <StyledContainer>
      <InnerContainer>
        <Link to="/" className="logoandname">
          {/* <span> */}
          <LogoSvg style={{ width: "50px", height: "auto" }} />
          {/* </span> */}
          <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
            Claim App
          </span>
        </Link>

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
