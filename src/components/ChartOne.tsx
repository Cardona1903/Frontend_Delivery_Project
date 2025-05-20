import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Order } from '../models/Order';

interface ChartOneProps {
  data: Order[];
}

const ChartOne: React.FC<ChartOneProps> = ({ data }) => {
  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
    series: [],
    options: {
      colors: ['#3C50E0', '#80CAEE'],
      chart: {
        fontFamily: 'Satoshi, sans-serif',
        type: 'bar',
        height: 335,
        stacked: false,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 1536,
          options: {
            plotOptions: {
              bar: {
                borderRadius: 0,
                columnWidth: '25%',
              },
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 0,
          columnWidth: '25%',
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'last',
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [],
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontFamily: 'Satoshi',
        fontWeight: 500,
        fontSize: '14px',
        markers: {
          radius: 99,
        },
      },
      fill: {
        opacity: 1,
      },
    },
  });

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Procesar datos para el gráfico
    const processData = () => {
      // Agrupar ventas por mes
      const salesByMonth: { [key: string]: { current: number; previous: number } } = {};
      
      // Obtener el año actual
      const currentYear = new Date().getFullYear();
      
      // Inicializar los meses
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      
      months.forEach(month => {
        salesByMonth[month] = { current: 0, previous: 0 };
      });
      
      // Procesar datos de ventas
      data.forEach(order => {
        if (order.created_at) {
          const date = new Date(order.created_at);
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear();
          
          if (year === currentYear) {
            salesByMonth[month].current += order.total_price;
          } else if (year === currentYear - 1) {
            salesByMonth[month].previous += order.total_price;
          }
        }
      });
      
      // Preparar series para el gráfico
      const currentYearData = months.map(month => salesByMonth[month].current);
      const previousYearData = months.map(month => salesByMonth[month].previous);
      
      setChartData({
        series: [
          {
            name: `${currentYear}`,
            data: currentYearData,
          },
          {
            name: `${currentYear - 1}`,
            data: previousYearData,
          },
        ],
        options: {
          ...chartData.options,
          xaxis: {
            categories: months,
          },
        },
      });
    };
    
    processData();
  }, [data]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div>
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ChartOne;