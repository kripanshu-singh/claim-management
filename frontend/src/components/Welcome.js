import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

const DashboardContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding-left: 15px;
  width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
  h1{
    font-size: 36px; 
    margin: 0px;
    text-transform: capitalize;
    font-weight: 400;
  }
  
  .dateContainers{
     color: #878787;
     font-size: 22px;
     font-weight: 400;
  }
`;

function Welcome({ name }) {
  return (
    <DashboardContainer>
      <div>
        <h1 className='weight'>
          {' '}
          Welcome,
          {' '}
          {name}
        </h1>
        <span className="dateContainers">
          {dayjs().locale('en').format('dddd, MMMM D, YYYY')}
        </span>
      </div>
    </DashboardContainer>
  );
}

export default Welcome;