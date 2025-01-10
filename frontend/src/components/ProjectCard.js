import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'antd';
import approve from '../assets/approve.svg';
import reject from '../assets/reject.svg';
import pending from '../assets/pending.svg';
import arrow from '../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';

const StyledCardContainer = styled.div`
  width: 100%;
`;

const StyledCard = styled(Card)`
border: 1px solid rgb(165, 165, 165);
  .ant-card-body
  {
    &::before,&::after{
      display: none;
    }

    padding:16px !important;
    display: flex;
    justify-content: space-between;
  }
  .project-name-container
  {
    color: #6A6A6A;
    font-size: 16px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .count
  {
    color: #333333;
    font-weight: 600;
    font-size: 32px;
  }
  .project-icons
  {
    font-size: 48px;
    font-weight: 300 !important;
  }
  .task-type-container
  {
  }
  .project-icons-img{
    border-radius: 12px;
    padding:16px;
    height: 40px;
  }
`;

function ProjectCard({ key, project, count = 0 }) {
  const {
    background, name, type
  } = project;
  const navigate = useNavigate();

  return (
    <StyledCardContainer
      key={key}
      xs={{ span: 12 }}
      sm={{ span: 8 }}
      md={{ span: 8 }}
      lg={{ span: 6 }}
      style={{ cursor: type === 'claim insurance' ? "pointer" : '' }}
      onClick={() => {
        if (type === 'claim insurance') {
          navigate('/raise_claim');
        } else {
          return;
        }
      }}
    >
      <StyledCard>
        <div className="project-name-container">
          <div>{name}</div>
          <div className="count">{type === 'claim insurance' ? 'Claim Insurance' : count}</div>
        </div>
        <img className='project-icons-img' src={type === 'approved' ? approve : type === 'rejected' ? reject : type === 'pending' ? pending : arrow} alt="logo" style={{ backgroundColor: background }} />
      </StyledCard>
    </StyledCardContainer>

  );
}

ProjectCard.propTypes = {
  project: PropTypes.objectOf(),
  key: PropTypes.number,
  count: PropTypes.number,
};

ProjectCard.defaultProps = {
  project: {},
  key: 0,
  count: 0,
};

export default ProjectCard;
