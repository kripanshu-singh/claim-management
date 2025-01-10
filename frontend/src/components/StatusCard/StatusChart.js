import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { findDataProperty, chartOnClick } from './helper.js';
import { statusChartOptions } from './constant.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartContainer = styled.div`
  height: 32px;
  overflow: hidden;
  border-radius: 24px;

`;

function StatusChart({ taskDetailData, setTaskDetail }) {
  const data = {
    labels: ['user'],
    datasets: [
      {
        label: 'COMPLETED',
        backgroundColor: findDataProperty(taskDetailData, 'completed', 'color'),
        data: [findDataProperty(taskDetailData, 'completed', 'val')],
        borderSkipped: 'left',
        hoverBackgroundColor: '#66B581',
      },
      {
        label: 'PENDING',
        hoverBackgroundColor: '#E7AC4C',
        backgroundColor: findDataProperty(taskDetailData, "pending", 'color'),
        data: [findDataProperty(taskDetailData, 'pending', 'val')],
      },
      {
        label: 'REJECTED',
        hoverBackgroundColor: '#C54E44',
        backgroundColor: findDataProperty(taskDetailData, "rejected", 'color'),
        data: [findDataProperty(taskDetailData, 'rejected', 'val')],
        borderSkipped: 'right',
      },
    ],
  };

  statusChartOptions.onClick = (event, element, chart) => chartOnClick(event, element, chart, setTaskDetail, taskDetailData);

  return (
    <ChartContainer>
      <Bar data={data} options={statusChartOptions} />
    </ChartContainer>
  );
}

export default StatusChart;
