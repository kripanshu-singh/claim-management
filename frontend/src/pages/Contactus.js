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
                  href="mailto:kripanshusingh16@gmail.com"
                  className="contact-link"
                >
                  kripanshusingh16@gmail.com
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
