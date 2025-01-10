export const findDataProperty = (taskArray, taskType, property) => {
    const result = taskArray?.find((task) => task.taskType === taskType.toLowerCase());
    return result[property];
  };

  export const chartOnClick = (event, element, chart, setTaskDetail, taskDetailData) => {
    if (!chart || !element) {
      console.error('Chart or element is undefined');
      return;
    }
    let data = {};
    element.forEach((point) => {
      const taskType = chart.data.datasets[point.datasetIndex].label;
      data = taskDetailData.find((task) => task.taskType === taskType.toLowerCase());
    });
    setTaskDetail(data);
  };
