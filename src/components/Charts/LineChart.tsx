// src/components/Charts/LineChart.tsx
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Order } from '../../models/Order';

interface LineChartProps {
  orders: Order[];
}

const LineChart = ({ orders }: LineChartProps) => {
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
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy',
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
      colors: ['#3C50E0'],
    },
  });

  useEffect(() => {
    if (!orders || orders.length === 0) return;

    const ordersByMonth: { [key: string]: number } = {};
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    months.forEach(month => {
      ordersByMonth[month] = 0;
    });

    orders.forEach(order => {
      // Check if created_at exists and is a string
      if (order.created_at && typeof order.created_at === 'string') {
        const date = new Date(order.created_at);

        // Check if the date is valid
        if (!isNaN(date.getTime())) {
          const monthIndex = date.getMonth(); // Get month index (0-11)
          const month = months[monthIndex]; // Get short month name from array
          ordersByMonth[month]++;
        } else {
          console.error('Invalid date format for order:', order);
        }
      } else {
        console.error('Missing or invalid created_at for order:', order);
      }
    });

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
  }, [orders]);

  return (
    <div className="h-full">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Order Trends
        </h3>
        <p className="text-sm text-gray-500">Monthly order volume</p>
      </div>
      <div>
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

export default LineChart;