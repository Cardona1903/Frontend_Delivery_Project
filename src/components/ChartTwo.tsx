import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

interface ChartTwoProps {
  data: Product[];
  ordersData: Order[];
}

const ChartTwo: React.FC<ChartTwoProps> = ({ data, ordersData }) => {
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
    if (!data || data.length === 0 || !ordersData || ordersData.length === 0) return;

    // Procesar datos para el gráfico
    const processData = () => {
      // Agrupar productos por categoría
      const categoryCounts: {[key: string]: number} = {};
      
      // Contar productos por categoría
      data.forEach(product => {
        if (product.category) {
          if (!categoryCounts[product.category]) {
            categoryCounts[product.category] = 0;
          }
          
          // Contar ventas totales por categoría
          // Esto es una simplificación, ya que no tenemos una relación directa entre órdenes y productos
          // En un caso real, necesitarías relacionar órdenes con productos a través de menu_id
          categoryCounts[product.category] += product.price;
        }
      });
      
      // Ordenar categorías por valor y tomar las 5 principales
      const topCategories = Object.entries(categoryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      const labels = topCategories.map(([category]) => category);
      const values = topCategories.map(([, value]) => value);
      
      setChartData({
        series: values,
        options: {
          ...chartData.options,
          labels,
        },
      });
    };
    
    processData();
  }, [data, ordersData]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Product Categories
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartTwo" className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="donut"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;