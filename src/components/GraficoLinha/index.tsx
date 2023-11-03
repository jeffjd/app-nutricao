'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Gráfico de calorias',
    },
  },
};

interface GraficoLinhaProps {
  cal: [string, number][];
}

const GraficoLinha: React.FC<GraficoLinhaProps> = ({ cal }) => {
  const vetorData = [];
  const vetorCaloria = [];

  for (let i = 0; cal.length > i; i++) {
    vetorData.push(cal[i][0]);
    vetorCaloria.push(cal[i][1]);
  }

  const data = {
    labels: vetorData,
    datasets: [
      {
        label: 'Calorias',
        data: vetorCaloria,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default GraficoLinha;