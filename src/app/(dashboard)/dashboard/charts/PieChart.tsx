import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const UserRolePieChart = () => {
  // Define the data structure for the chart
  const chartData = {
    labels: ['Admin', 'Teacher', 'Student'],
    datasets: [
      {
        label: 'User Roles',
        data: [1, 20, 120], // Admin: 1, Teacher: 20, Student: 120
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Define the options for the chart

  return <Pie data={chartData} options={{
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Roles Distribution',
      },
    },
  }} />;
};

export default UserRolePieChart;
