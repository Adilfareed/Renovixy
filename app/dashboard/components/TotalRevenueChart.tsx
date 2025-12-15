// components/TotalRevenueChart.tsx
 "use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';

// **Register Chart.js components**
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define a type for the data structure to ensure correctness
type BarChartData = ChartData<'bar', number[], string>;
type BarChartOptions = ChartOptions<'bar'>;


// **DUMMY DATA (Typed)**
const data: BarChartData = {
  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Online Sales',
      data: [13, 17, 8, 17, 12, 18, 20], // Values in thousands
      backgroundColor: '#3b82f6', 
      borderRadius: 4,
      barPercentage: 0.7, 
      categoryPercentage: 0.8,
    },
    {
      label: 'Offline Sales',
      data: [15, 12, 23, 7, 13, 15, 12], // Values in thousands
      backgroundColor: '#10b981', 
      borderRadius: 4,
      barPercentage: 0.7,
      categoryPercentage: 0.8,
    },
  ],
};

const options: BarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
      }
    },
    title: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += `$${context.parsed.y}k`;
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => value + 'k' 
      },
      min: 0,
      max: 25, 
      grid: {
        color: '#e5e7eb',
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

const TotalRevenueChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-96">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Total Revenue</h2>
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalRevenueChart;