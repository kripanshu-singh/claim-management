import styled from "styled-components";
import pic from "../assets/image.png";
import { Code, Cpu, Rocket, Server, ShieldCheck } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

const Section = styled.section`
  height: calc(100dvh - 134px);
  display: flex;
  align-items: center;
  position: relative;
  background: #ffffff;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;
`;

const ColumnLeft = styled.div`
  flex: 1;
  min-width: 280px;
  perspective: 1500px;

  @media (max-width: 768px) {
    flex: 100%;
    display: flex;
    justify-content: center;
  }
`;

const ColumnRight = styled.div`
  flex: 1.5;
  min-width: 280px;
`;

const TiltContainer = styled(Tilt)`
  position: relative;
  max-width: 340px;
  transform-style: preserve-3d;
  transition: all 0.6s ease;
`;

const ProfileCard = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.15);
  transform-style: preserve-3d;
  will-change: transform;
  border: 1px solid rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
`;

// Layer 1: Deepest background (Office image)
const BackgroundLayer = styled.div`
  position: absolute;
  top: -30px;
  left: -30px;
  right: -30px;
  bottom: -30px;
  background-size: 120% 120%;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(3px) brightness(0.6) contrast(0.8);
  transform: translateZ(-80px) scale(1.2);
  transform-style: preserve-3d;
  z-index: 0;
  border-radius: 30px;
  opacity: 0.8;
`;

// Layer 2: Geometric shapes for depth
const GeometricLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  transform: translateZ(-60px);
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    width: 80px;
    height: 80px;
    background: linear-gradient(
      45deg,
      rgba(79, 70, 229, 0.1),
      rgba(99, 102, 241, 0.05)
    );
    border-radius: 50%;
    top: 20%;
    right: 10%;
    animation: slowRotate 20s linear infinite;
    transform: translateZ(10px);
  }

  &::after {
    content: "";
    position: absolute;
    width: 60px;
    height: 60px;
    background: linear-gradient(
      135deg,
      rgba(139, 92, 246, 0.08),
      rgba(79, 70, 229, 0.03)
    );
    border-radius: 20px;
    bottom: 15%;
    left: 8%;
    animation: slowRotate 25s linear infinite reverse;
    transform: translateZ(15px);
  }

  @keyframes slowRotate {
    from {
      transform: rotate(0deg) translateZ(10px);
    }
    to {
      transform: rotate(360deg) translateZ(10px);
    }
  }
`;

// Layer 3: Ambient glow effect
const AmbientGlow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  overflow: hidden;
  z-index: 2;
  pointer-events: none;
  transform: translateZ(-40px);
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 40%,
      rgba(79, 70, 229, 0.15) 0%,
      rgba(99, 102, 241, 0.08) 40%,
      transparent 70%
    );
    top: -50%;
    left: -50%;
    animation: ambientPulse 12s ease-in-out infinite;
  }

  @keyframes ambientPulse {
    0%,
    100% {
      transform: scale(1) rotate(0deg);
      opacity: 0.6;
    }
    50% {
      transform: scale(1.1) rotate(5deg);
      opacity: 0.3;
    }
  }
`;

// Layer 4: Tech pattern overlay
const TechPatternLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
  transform: translateZ(-20px);
  transform-style: preserve-3d;
  opacity: 0.4;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234f46e5' fill-opacity='0.03'%3E%3Cpath d='M20 20.5V18H0v-2h20v2.5zm0 2.5v2.5H0V23h20zm0 5V28H0v-2h20v2.5z'/%3E%3C/g%3E%3C/svg%3E");
    animation: patternShift 30s linear infinite;
  }

  @keyframes patternShift {
    from {
      transform: translateX(0) translateY(0);
    }
    to {
      transform: translateX(40px) translateY(40px);
    }
  }
`;

// Layer 5: Profile image container
const ProfileImageContainer = styled.div`
  position: relative;
  z-index: 5;
  transform: translateZ(0px);
  transform-style: preserve-3d;
`;

const ProfileImage = styled(motion.img)`
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  transform-style: preserve-3d;
  filter: contrast(1.05) brightness(1.02);
`;

// Layer 6: Interactive overlay
const InteractiveOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.12) 0%,
    rgba(99, 102, 241, 0.08) 30%,
    rgba(139, 92, 246, 0.06) 60%,
    transparent 100%
  );
  z-index: 4;
  transform: translateZ(20px);
  transform-style: preserve-3d;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${ProfileCard}:hover & {
    opacity: 1;
  }
`;

// Layer 7: Floating tech icons (multiple depths)
const FloatingTechIcons = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 6;
  transform-style: preserve-3d;

  svg {
    position: absolute;
    // color: #4f46e5;
    filter: drop-shadow(0 2px 8px rgba(79, 70, 229, 0.3));
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    padding: 6px;
    backdrop-filter: blur(8px);
    border: 1px solid rgba(79, 70, 229, 0.2);
    transition: all 0.3s ease;
  }

  // Back layer icons (slower movement)
  @keyframes floatSlow {
    0%,
    100% {
      transform: translateY(0) translateX(0) translateZ(var(--z-depth, 30px));
    }
    50% {
      transform: translateY(-8px) translateX(4px)
        translateZ(var(--z-depth, 30px));
    }
  }

  @keyframes floatMedium {
    0%,
    100% {
      transform: translateY(0) translateX(0) translateZ(var(--z-depth, 45px));
    }
    50% {
      transform: translateY(-12px) translateX(6px)
        translateZ(var(--z-depth, 45px));
    }
  }

  @keyframes floatFast {
    0%,
    100% {
      transform: translateY(0) translateX(0) translateZ(var(--z-depth, 60px));
    }
    50% {
      transform: translateY(-16px) translateX(8px)
        translateZ(var(--z-depth, 60px));
    }
  }
`;

// Layer 8: Top glow effect
const TopGlowEffect = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 20px;
  overflow: hidden;
  z-index: 7;
  pointer-events: none;
  transform: translateZ(70px);
  transform-style: preserve-3d;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 30%;
    background: linear-gradient(
      180deg,
      rgba(79, 70, 229, 0.15) 0%,
      transparent 100%
    );
    top: 0;
    left: 0;
    animation: topGlow 6s ease-in-out infinite;
  }

  @keyframes topGlow {
    0%,
    100% {
      opacity: 0.3;
      transform: scaleY(1);
    }
    50% {
      opacity: 0.6;
      transform: scaleY(1.1);
    }
  }
`;

const ContentWrapper = styled.div`
  div.Main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }

  div.badge {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    gap: 6px;
    background: rgba(79, 70, 229, 0.1);
    color: #4f46e5;
    padding: 6px 12px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 13px;
    backdrop-filter: blur(5px);
    border: 1px solid rgba(79, 70, 229, 0.2);
    margin-bottom: 8px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  h2 {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    color: #111827;
    background: linear-gradient(90deg, #111827 0%, #4f46e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.6;
    color: #374151;
    margin-bottom: 20px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 24px 0;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.05),
    0 1px 3px -1px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px -3px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.05);
  }

  svg {
    width: 18px;
    height: 18px;
    color: #4f46e5;
  }

  div {
    h3 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 2px;
      color: #111827;
    }

    p {
      font-size: 13px;
      color: #6b7280;
      margin: 0;
    }
  }
`;

const AboutUs = () => {
  return (
    <Section id="about">
      <Container>
        <Row>
          <ColumnLeft>
            <TiltContainer
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareMaxOpacity={0.4}
              glareColor="#4f46e5"
              glarePosition="all"
              glareBorderRadius="20px"
              scale={1.04}
              transitionSpeed={800}
              gyroscope={true}
              perspective={1500}
              tiltReverse={false}
            >
              <ProfileCard
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Layer 1: Deepest background */}
                <BackgroundLayer />

                {/* Layer 2: Geometric shapes */}
                <GeometricLayer />

                {/* Layer 3: Ambient glow */}
                <AmbientGlow />

                {/* Layer 4: Tech pattern */}
                <TechPatternLayer />

                {/* Layer 5: Profile image */}
                <ProfileImageContainer>
                  <ProfileImage
                    src={pic}
                    alt="Kripanshu Singh"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  />
                </ProfileImageContainer>
                <InteractiveOverlay />

                {/* Layer 8: Top glow effect */}
                <TopGlowEffect />
              </ProfileCard>
            </TiltContainer>
          </ColumnLeft>
          <ColumnRight>
            <ContentWrapper>
              <div className="Main">
                <div className="badge">
                  <Code size={14} />
                  Full Stack Developer
                </div>
                <h2>Kripanshu Singh</h2>
              </div>
              <p>
                Passionate developer with expertise in building high-performance
                web applications. Delivered impactful solutions at{" "}
                <b>Aarogya ID</b> and <b>Messold Technologies</b>, optimizing
                systems for scalability and security.
              </p>

              <StatsGrid>
                <StatItem>
                  <Rocket size={18} />
                  <div>
                    <h3>40%</h3>
                    <p>API performance improved</p>
                  </div>
                </StatItem>
                <StatItem>
                  <Server size={18} />
                  <div>
                    <h3>25+</h3>
                    <p>Backend APIs built</p>
                  </div>
                </StatItem>
                <StatItem>
                  <Cpu size={18} />
                  <div>
                    <h3>1000+</h3>
                    <p>Daily active users</p>
                  </div>
                </StatItem>
                <StatItem>
                  <ShieldCheck size={18} />
                  <div>
                    <h3>500+</h3>
                    <p>Secure transactions/day</p>
                  </div>
                </StatItem>
              </StatsGrid>

              <p>
                Currently pursuing B.Tech in Computer Science while developing
                production-grade applications with React, Node.js, and modern
                cloud technologies.
              </p>
            </ContentWrapper>
          </ColumnRight>
        </Row>
      </Container>
    </Section>
  );
};

export default AboutUs;
