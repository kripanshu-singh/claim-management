import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../assets/logo.svg";

const StyledFooter = styled.div`
  background-color: white;
  border-top: 1px solid black;
  height: 66px;

  .image-footer{
    margin-bottom: -15px;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .p-8 {
  }

  .inline-flex {
    display: inline-flex;
    align-items: center;
  }
  .MyLinks {
  }
  svg {
    width: 50px; /* Set the width */
    height: auto; /* Maintain aspect ratio */
  }

  .text-lg {
    font-weight: bold;
  }

  .flex-items {
    display: flex;
    flex-wrap: wrap;
  }

  .flex-items span {
    font-weight: 600;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 22px;
    margin-right: 26px;
  }

  li {
    list-style: none;
  }

  a {
    font-weight: 500;
    color: #4b5563;
    text-decoration: none;
    &:hover {
      color: #374151;
    }
  }
  .footer-text{
    margin-right: -200px;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="flex-wrap">
        <div className="w-auto p-8">
        </div>
        <div className="w-auto p-8 footer-text">
          <div className="flex-items">
            Made by
            <span>
              &nbsp;
              <u>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://kripanshu-singh.github.io/me/"
                  style={{ color: "black", fontWeight: "500" }}
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
                href="https://www.linkedin.com/in/singh-kripanshu/"
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
                href="mailto:kripanshusingh16@gmail.com"
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
    </StyledFooter>
  );
};

export default Footer;
