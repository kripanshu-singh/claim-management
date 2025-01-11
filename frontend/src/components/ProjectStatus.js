import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProjectCard from "./ProjectCard.js";
import { projectStatus } from "./constant.js";

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;

function ProjectStatus({ taskDetailData }) {
  console.log(`\n ~ ProjectStatus ~ taskDetailData :- `, taskDetailData);

  return (
    <StyledContainer gutter={24}>
      {projectStatus.map((project, index) => (
        <ProjectCard
          project={project}
          key={index}
          count={
            taskDetailData.find(
              (task) => task.taskType === project.type.toLowerCase(),
            )?.noOfTask || 0
          }
        />
      ))}
    </StyledContainer>
  );
}

export default ProjectStatus;
