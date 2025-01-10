import React from "react";
import styled from "styled-components";
import pic from "../assets/banner-img.png";
import { ReactComponent as LogoSvg } from "../assets/square.svg";

const Section = styled.section`
display: flex;
height: calc( 100dvh - 134px);
  overflow: hidden;
  display: flex;
  flex-direction: row;
    justify-content: center;
    align-items: center;
  background-color: #ffffff;
  &.dark {
    background-color: #1a202c;
  }

  @media (max-width: 1024px) {
    padding: 12px 0;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  // margin: 0 auto;
  padding: 0 16px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -16px;
`;

const ColumnLeft = styled.div`
  width: 100%;
  padding: 16px;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const ColumnRight = styled.div`
  width: 100%;
  padding: 16px;

  @media (min-width: 1024px) {
    width: 41.66%;
    padding-left: 28px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: -12px;

  .image-container {
    position: relative;
    z-index: 10;
    margin: 16px 12px;

    img {
      border-radius: 16px;
      padding-bottom: 40px;
    }

    span {
      position: absolute;
      right: -1.75rem;
      bottom: 2.5rem;
      z-index: -1;
      color: #000000;
      width: 100px;
    }
  }
`;

const ContentWrapper = styled.div`
  margin-top: 40px;

  @media (min-width: 1024px) {
    margin-top: 0;
  }

  span {
    display: block;
    // margin-bottom: 16px;
    font-size: 15px;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    color: #1a202c;

    &.light {
      color: #f7fafc;
    }

    @media (min-width: 640px) {
      font-size: 40px;
      line-height: 48px;
    }
  }

  p {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 1.75;
    color: #4a5568;

    &.dark {
      color: #718096;
    }
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 28px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    // background-color: #6366f1; /* Primary color */
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      // color: rgba(99, 102, 241, 0.9); /* Slightly lighter on hover */
    }

    &.contact-link {
      color: #000000;
      font-weight: 600;
      text-decoration: none;
    }
  }
`;

const Contact = () => {
  return (
    <Section>
      <Container>
        <Row>
          <ColumnLeft>
            <ImageWrapper>
              <div className="image-container">
                <img src={pic} alt="" />
                <span className="logoSvg">
                  {" "}
                  {/* <LogoSvg /> */}
                  <svg
                    width={134}
                    height={106}
                    viewBox="0 0 134 106"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="1.66667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 1.66667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 16.3333 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 31 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 45.6667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3334"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 60.3334 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 88.6667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 117.667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 74.6667 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 103 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy={104}
                      r="1.66667"
                      transform="rotate(-90 132 104)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 1.66667 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 16.3333 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 31 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="89.3333"
                      r="1.66667"
                      transform="rotate(-90 45.6667 89.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 60.3333 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 88.6667 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 117.667 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 74.6667 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 103 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="89.3338"
                      r="1.66667"
                      transform="rotate(-90 132 89.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="74.6673"
                      r="1.66667"
                      transform="rotate(-90 1.66667 74.6673)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 1.66667 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 16.3333 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 16.3333 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 31 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 31 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 45.6667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="31.0003"
                      r="1.66667"
                      transform="rotate(-90 45.6667 31.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 60.3333 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 60.3333 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 88.6667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 88.6667 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 117.667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 117.667 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 74.6667 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 74.6667 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 103 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 103 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="74.6668"
                      r="1.66667"
                      transform="rotate(-90 132 74.6668)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="30.9998"
                      r="1.66667"
                      transform="rotate(-90 132 30.9998)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 1.66667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 1.66667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 16.3333 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 16.3333 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 31 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 31 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 45.6667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 45.6667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 60.3333 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 60.3333 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 88.6667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 88.6667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 117.667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 117.667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 74.6667 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 74.6667 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 103 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 103 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="60.0003"
                      r="1.66667"
                      transform="rotate(-90 132 60.0003)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="16.3333"
                      r="1.66667"
                      transform="rotate(-90 132 16.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 1.66667 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="1.66667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 1.66667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 16.3333 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="16.3333"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 16.3333 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 31 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={31}
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 31 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="45.3333"
                      r="1.66667"
                      transform="rotate(-90 45.6667 45.3333)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="45.6667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 45.6667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 60.3333 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="60.3333"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 60.3333 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 88.6667 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="88.6667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 88.6667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 117.667 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="117.667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 117.667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 74.6667 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx="74.6667"
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 74.6667 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 103 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={103}
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 103 1.66683)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="45.3338"
                      r="1.66667"
                      transform="rotate(-90 132 45.3338)"
                      fill="#3056D3"
                    />
                    <circle
                      cx={132}
                      cy="1.66683"
                      r="1.66667"
                      transform="rotate(-90 132 1.66683)"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
              </div>
            </ImageWrapper>
          </ColumnLeft>
          <ColumnRight>
            <ContentWrapper>
              <h2>Contact me</h2>
              <p>Let's connect through mail or WhatsApp</p>
              <span>
                Email:{" "}
                <a
                  href="mailto:kripanshusingh@gmail.com"
                  className="contact-link"
                >
                  kripanshusingh@gmail.com
                </a>
              </span>
              <span>
                Phone:{" "}
                <a href="tel:7217228199" className="contact-link">
                  7217228199
                </a>
              </span>
              <br />
            </ContentWrapper>
          </ColumnRight>
        </Row>
      </Container>
    </Section>
  );
};

export default Contact;
