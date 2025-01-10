import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProjectCard from './ProjectCard.js';
import { projectStatus } from './constant.js';

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

function ProjectStatus({ taskDetailData }) {
  return (
    <StyledContainer gutter={24}>
      {projectStatus.map((project, index) => (
        <ProjectCard
          project={project}
          key={index}
          count={taskDetailData[index]?.noOfTask || 0}
        />
      ))}
    </StyledContainer>
  );
}

export default ProjectStatus;
