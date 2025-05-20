import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Order } from '../models/Order';

interface ChartThreeProps {
  data: Order[];
}

const ChartThree: React.FC<ChartThreeProps> = ({ data }) => {
  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
    series: [
      {
        name: 'Orders',
        data: [],
      },
    ],
    options: {
      colors: ['#3C50E0'],
      chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'area',
        height: 350,
        toolbar: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      markers: {
        size: 4,
        colors: ['#3C50E0'],
        strokeColors: '#ffffff',
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
          size: 6,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      grid: {
        show: true,
        strokeDashArray: 5,
        borderColor: '#EEEEEE',
      },
      xaxis: {
        categories: [],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          text: 'Number of Orders',
          style: {
            fontSize: '14px',
            fontWeight: 500,
          },
        },
      },
    },
  });

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Procesar datos para el gráfico
    const processData = () => {
      // Agrupar órdenes por mes
      const ordersByMonth: { [key: string]: number } = {};
      
      // Inicializar los meses
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      
      months.forEach(month => {
        ordersByMonth[month] = 0;
      });
      
      // Procesar datos de órdenes
      data.forEach(order => {
        if (order.created_at) {
          const date = new Date(order.created_at);
          const month = date.toLocaleString('default', { month: 'short' });
          
          ordersByMonth[month]++;
        }
      });
      
      // Preparar series para el gráfico
      const orderCounts = months.map(month => ordersByMonth[month]);
      
      setChartData({
        series: [
          {
            name: 'Orders',
            data: orderCounts,
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            ...chartData.options.xaxis,
            categories: months,
          },
        },
      });
    };
    
    processData();
  }, [data]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Order Trends
          </h5>
        </div>
      </div>

      <div id="chartThree" className="mx-auto flex justify-center">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartThree;