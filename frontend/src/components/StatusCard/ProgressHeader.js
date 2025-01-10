import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  margin: 20px 0px;
   .percentage{
      font-size: 44px;
      font-weight: 600;
      padding-right: 16px;
      border-right: 1px solid #DFDFDF;
      text-align: center;
      align-items: center;
      justify-content: center;
   }
  .selectedTaskDetail{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding:6px 0px 6px 16px;
     .taskType{
        font-size: 12px;
        margin: 0px;
        text-transform: uppercase;
     }
    .taskStats{
      font-size: 12px;
      margin: 0px;
    }
  } 
`;

function ProgressHeader({ taskDetail }) {
  const {
    val, color, taskType, noOfTask, totalTasks,
  } = taskDetail;
  return (
    <HeaderContainer>
      <div className="percentage">
        {val}
        %
      </div>
      <div className="selectedTaskDetail">
        <p className="taskType" style={{ color }}>
          {' '}
          {taskType}
        </p>
        <p className="taskStats">
          {noOfTask}
          {' '}
          OUT OF
          {' '}
          {totalTasks}
          {' '}
          TASKS
        </p>
      </div>
    </HeaderContainer>
  );
}

export default ProgressHeader;
