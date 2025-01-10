import React, { useState } from 'react';
import StatusChart from './StatusChart.js';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';
import ProgressHeader from './ProgressHeader.js';
import TaskStatusTable from './TaskStatusTable.js';

const StyledContainer = styled.div`
  border: 1px solid rgb(135, 135, 135);
  border-radius: 8px;
  padding: 16px;
`;
const StatusCard = ({ taskDetailData }) => {
    const [taskDetail, setTaskDetail] = useState(taskDetailData[0]);
    return (
        <StyledContainer>
            <ProgressHeader taskDetail={taskDetail} />
            <StatusChart taskDetailData={taskDetailData} setTaskDetail={setTaskDetail} />
            <TaskStatusTable taskDetail={taskDetailData} onClick={setTaskDetail} />
        </StyledContainer>
    )
}

export default StatusCard