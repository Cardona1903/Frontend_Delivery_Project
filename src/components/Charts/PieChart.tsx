// src/components/Charts/PieChart.tsx
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Product } from '../../models/Product';

interface PieChartProps {
  products: Product[];
}

const PieChart = ({ products }: PieChartProps) => {
  const [chartData, setChartData] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [],
    options: {
      chart: {
        type: 'donut',
        fontFamily: 'Satoshi, sans-serif',
      },
      colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF', '#80CAEE'],
      labels: [],
      legend: {
        show: true,
        position: 'bottom',
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            background: 'transparent',
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 2600,
          options: {
            chart: {
              width: 380,
            },
          },
        },
        {
          breakpoint: 640,
          options: {
            chart: {
              width: 300,
            },
          },
        },
      ],
    },
  });

  useEffect(() => {
    if (!products || products.length === 0) return;

    // Agrupar productos por categoría
    const categoryCounts: { [key: string]: number } = {};
    
    products.forEach(product => {
      if (product.category) {
        if (!categoryCounts[product.category]) {
          categoryCounts[product.category] = 0;
        }
        categoryCounts[product.category]++;
      }
    });
    
    // Ordenar categorías por cantidad y tomar las 5 principales
    const topCategories = Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    const labels = topCategories.map(([category]) => category);
    const values = topCategories.map(([, count]) => count);
    
    setChartData({
      series: values,
      options: {
        ...chartData.options,
        labels,
      },
    });
  }, [products]);

  return (
    <div className="h-full">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Product Categories
        </h3>
        <p className="text-sm text-gray-500">Distribution of products by category</p>
      </div>
      <div className="mx-auto flex justify-center">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
};

export default PieChart;