import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../assets/logo.svg";

const StyledFooter = styled.section`
  position: relative;
  overflow: hidden;
  background-color: white;
  padding: 1.5rem 0;
  border-top: 1px solid black;

  .container {
    position: relative;
    z-index: 10;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: -2rem;
  }

  .p-8 {
    padding: 2rem;
  }

  .inline-flex {
    display: inline-flex;
    align-items: center;
  }
  .MyLinks {
    margin-right: 1rem;
  }
  svg {
    width: 50px; /* Set the width */
    height: auto; /* Maintain aspect ratio */
  }

  .text-lg {
    font-size: 1.125rem;
    font-weight: bold;
    margin-left: 1rem;
  }

  .flex-items {
    display: flex;
    flex-wrap: wrap;
    margin: -0.375rem;
  }

  .flex-items span {
    font-weight: 600;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin: -1.25rem;
    align-items: center;
  }

  li {
    list-style: none;
    padding: 1.25rem;
  }

  a {
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    &:hover {
      color: #374151;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <div className="flex-wrap">
          <div className="w-auto p-8">
            <Link to="/">
              <div className="inline-flex">
                <LogoSvg />
              </div>
            </Link>
          </div>
          <div className="w-auto p-8">
            <div className="flex-items">
              Designed by
              <span>
                &nbsp;
                <u>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://kripanshu-singh.github.io/me/"
                    style={{ color: "black", fontWeight: "bolder" }}
                  >
                    Kripanshu Singh
                  </a>
                </u>
              </span>
            </div>
          </div>
          <div className="w-auto p-8 MyLinks">
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/kripanshu-singh/"
                >
                  Linkedin
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/kripanshu-singh"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="mailto:kripanshusingh160305@gmail.com"
                >
                  Email
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href="tel:7217228199">
                  Phone
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
