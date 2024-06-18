import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = () => {
  // Define the data structure for the chart
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Example weeks
    datasets: [
      {
        label: 'TGI Students',
        data: [2, 4, 6, 3], // Number of TGI students each week
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'TSRI Students',
        data: [8, 7, 3, 5], // Number of TSRI students each week
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'FC Students',
        data: [2, 3, 4, 2], // Number of FC students each week
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Define the options for the chart

  return <Bar
style={{
    height:'100%'
}}
  data={chartData} options={{
    responsive: true,

    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'New Students Enrollment per Week',
        font:{
            size : 16
        }
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        max : 20,
      },
    },
  }} />;
};

export default StackedBarChart;
