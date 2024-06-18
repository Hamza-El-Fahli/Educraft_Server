import React from 'react';
import { Bar , Line} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale,PointElement, LineElement, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale,PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const LoginChart = () => {
    const data = [10, 15, 8, 12, 20, 5, 7]; // Replace with actual data

  // Define the data structure for the chart
  const chartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Number of Users Logged In',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: true, // Fill the area under the line

      },
    ],
  };

  // Define the options for the chart

  return <Line
  style={{
    height:'100%'
  }}
  data={chartData} options={{
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14, // Set font size for legend
          },
        },
      },
      title: {
        display: true,
        text: 'User Logins This Week',
        font: {
          size: 16, // Set font size for title
        },
      },
      tooltip: {
        bodyFont: {
          size: 14, // Set font size for tooltip
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // Set font size for x-axis labels
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 14, // Set font size for y-axis labels
          },
        },
      },
    },
  }
} />;
};

export default LoginChart;
