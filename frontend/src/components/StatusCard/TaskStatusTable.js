import React from 'react';
import styled from 'styled-components';

const TaskStatusTableContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #EBEBEB;
  padding: 20px 0px;
  align-items: center;
  color: #6A6A6A;
  cursor: pointer;
  .taskStatus{
      display: flex;
      align-items: center;
      width:125px;
      text-transform: capitalize;
     .taskColorBox{
         height: 12px;
         width: 12px;
         border-radius: 100%;
         margin-right: 10px;
         margin-left: 5px;
      }

  }
  .taskNumbers{
    width:100px;
    text-align: right;
  }
  &:hover{
    color: #333333;
  }
`;

const TaskStatusTableContainer = styled.div`
  margin:8px 16px 0px 16px;
  .taskTable:last-child{
      border: none;
   }
`;

function TaskStatusTableContent({ task, onClick }) {
  const {
    color, taskType, val, noOfTask, totalTasks,
  } = task;
  return (
    <TaskStatusTableContentContainer className="taskTable" onClick={() => onClick(task)}>
      <div className="taskStatus">
        <span className="taskColorBox" style={{ backgroundColor: color }} />
        {taskType}
      </div>
      <div className="taskStatusPer">
        {val}
        %
      </div>
      <div className="taskNumbers">
        {noOfTask}
        {' '}
        Tasks
      </div>
    </TaskStatusTableContentContainer>
  );
}

function TaskStatusTable({ taskDetail, onClick }) {
  return (
    <TaskStatusTableContainer>
      {taskDetail.map((task) => <TaskStatusTableContent task={task} onClick={onClick} />)}
    </TaskStatusTableContainer>
  );
}

export default TaskStatusTable;
