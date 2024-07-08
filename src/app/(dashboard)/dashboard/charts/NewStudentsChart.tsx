import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = () => {
  // Define the data structure for the chart
  const chartData = {
    labels: ['semaines 1', 'semaines 2', 'semaines 3', 'semaines 4'], // Example weeks
    datasets: [
      {
        label: 'Etudiants TGI',
        data: [2, 4, 6, 3], // Number of TGI students each week
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Etudiants TSRI',
        data: [8, 7, 3, 5], // Number of TSRI students each week
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Etudiants FC',
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
        text: 'Nouvelles inscriptions d\'étudiantes',
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
