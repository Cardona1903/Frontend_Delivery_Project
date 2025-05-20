// src/pages/Dashboard/ECommerce.tsx
import { useState, useEffect } from 'react';
// Importar los servicios correctos
import { getOrders } from '../../services/OrderService';
import { getCustomers } from '../../services/CustomerService';
import { getProducts } from '../../services/ProductService';
import { getRestaurants } from '../../services/RestaurantService';
import { getMenus } from '../../services/MenuService'; // Nuevo servicio para menús
import { getDrivers } from '../../services/driverService'; // Nuevo servicio para conductores
import { getMotorcycles } from '../../services/MotorcycleService'; // Nuevo servicio para motocicletas
import { Order } from '../../models/Order';
import { Customer } from '../../models/Customer';
import { Product } from '../../models/Product';
import { Restaurant } from '../../models/Restaurant';
import { Menu } from '../../models/Menu';
import { Driver } from '../../models/Driver';
import { Motorcycle } from '../../models/Motorcycle';
import PieChart from '../../components/Charts/PieChart';
import BarChart from '../../components/Charts/BarChart';
import LineChart from '../../components/Charts/LineChart';

const ECommerce = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [timeRange, setTimeRange] = useState('month'); // 'today', 'week', 'month'
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    newCustomers: 0,
    conversionRate: 0,
    salesGrowth: 2.5,
    ordersGrowth: -0.8,
    customersGrowth: 12.4,
    conversionGrowth: 1.2
  });

  // Función para calcular estadísticas basadas en los modelos reales
  const calculateStats = (ordersData: Order[], customersData: Customer[]) => {
    // Total de ventas (suma de todos los montos de órdenes)
    const totalSales = ordersData.reduce((sum, order) => sum + (order.total_price || 0), 0);
    
    // Total de órdenes
    const totalOrders = ordersData.length;
    
    // Nuevos clientes (asumiendo que no tenemos fecha de creación, usamos el 20% del total)
    const newCustomers = Math.round(customersData.length * 0.2);
    
    // Tasa de conversión (órdenes / clientes)
    const conversionRate = customersData.length > 0 
      ? (totalOrders / customersData.length) * 100 
      : 0;
    
    return {
      totalSales,
      totalOrders,
      newCustomers,
      conversionRate,
      // Mantenemos los valores de crecimiento simulados
      salesGrowth: 2.5,
      ordersGrowth: -0.8,
      customersGrowth: 12.4,
      conversionGrowth: 1.2
    };
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}, ${date.getFullYear()}`;
  };

  // Función para formatear el monto
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Cargar datos
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Cargar datos en paralelo
        const [
          ordersData, 
          customersData, 
          productsData, 
          restaurantsData,
          menusData,
          driversData,
          motorcyclesData
        ] = await Promise.all([
          getOrders(),
          getCustomers(),
          getProducts(),
          getRestaurants(),
          getMenus(),
          getDrivers(),
          getMotorcycles()
        ]);
        
        setOrders(ordersData);
        setCustomers(customersData);
        setProducts(productsData);
        setRestaurants(restaurantsData);
        setMenus(menusData);
        setDrivers(driversData);
        setMotorcycles(motorcyclesData);
        
        // Calcular estadísticas
        const calculatedStats = calculateStats(ordersData, customersData);
        setStats(calculatedStats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange]); // Recargar cuando cambie el rango de tiempo

  // Filtrar órdenes recientes (últimas 5)
  const recentOrders = [...orders]
    .sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  // Obtener el nombre del cliente para una orden
  const getCustomerName = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Dashboard
        </h2>
        <div className="flex items-center gap-3">
          <select 
            className="px-4 py-2 rounded-lg border border-stroke bg-white dark:border-strokedark dark:bg-boxdark"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-opacity-90">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6 xl:gap-7.5 mb-6">
        {/* Tarjeta de Ventas Totales */}
        <div className="rounded-lg border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Sales</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary bg-opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <h4 className="mt-4 text-2xl font-bold text-black dark:text-white">
            {isLoading ? '...' : formatCurrency(stats.totalSales)}
          </h4>
          <div className="mt-2 flex items-center">
            <span className={`flex items-center gap-1 text-sm font-medium ${stats.salesGrowth >= 0 ? 'text-success' : 'text-danger'}`}>
              {stats.salesGrowth >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                </svg>
              )}
              {isLoading ? '...' : `${Math.abs(stats.salesGrowth).toFixed(1)}%`}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        {/* Tarjeta de Órdenes Totales */}
        <div className="rounded-lg border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Orders</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warning bg-opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-warning">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </span>
          </div>
          <h4 className="mt-4 text-2xl font-bold text-black dark:text-white">
            {isLoading ? '...' : stats.totalOrders.toLocaleString()}
          </h4>
          <div className="mt-2 flex items-center">
            <span className={`flex items-center gap-1 text-sm font-medium ${stats.ordersGrowth >= 0 ? 'text-success' : 'text-danger'}`}>
              {stats.ordersGrowth >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                </svg>
              )}
              {isLoading ? '...' : `${Math.abs(stats.ordersGrowth).toFixed(1)}%`}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        {/* Tarjeta de Nuevos Clientes */}
        <div className="rounded-lg border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">New Customers</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success bg-opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-success">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </span>
          </div>
          <h4 className="mt-4 text-2xl font-bold text-black dark:text-white">
            {isLoading ? '...' : stats.newCustomers.toLocaleString()}
          </h4>
          <div className="mt-2 flex items-center">
            <span className={`flex items-center gap-1 text-sm font-medium ${stats.customersGrowth >= 0 ? 'text-success' : 'text-danger'}`}>
              {stats.customersGrowth >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                </svg>
              )}
              {isLoading ? '...' : `${Math.abs(stats.customersGrowth).toFixed(1)}%`}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        {/* Tarjeta de Tasa de Conversión */}
        <div className="rounded-lg border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Conversion Rate</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-info bg-opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-info">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </span>
          </div>
          <h4 className="mt-4 text-2xl font-bold text-black dark:text-white">
            {isLoading ? '...' : `${stats.conversionRate.toFixed(1)}%`}
          </h4>
          <div className="mt-2 flex items-center">
            <span className={`flex items-center gap-1 text-sm font-medium ${stats.conversionGrowth >= 0 ? 'text-success' : 'text-danger'}`}>
              {stats.conversionGrowth >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                </svg>
              )}
              {isLoading ? '...' : `${Math.abs(stats.conversionGrowth).toFixed(1)}%`}
            </span>
            <span className="text-xs text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:gap-7.5 mb-6">
        {/* Gráfico de Serie Temporal */}
        <div className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-6 xl:p-7.5">
          {isLoading ? (
            <div className="flex h-80 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <LineChart orders={orders} />
          )}
        </div>

        {/* Gráfico Circular */}
        <div className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-6 xl:p-7.5">
          {isLoading ? (
            <div className="flex h-80 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <PieChart products={products} />
          )}
        </div>
      </div>

      {/* Gráfico de Barras */}
      <div className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-6 xl:p-7.5 mb-6">
        {isLoading ? (
          <div className="flex h-80 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <BarChart orders={orders} restaurants={restaurants} menus={menus} />
        )}
      </div>

      {/* Órdenes recientes */}
      <div className="rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:p-6 xl:p-7.5 mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Recent Orders
          </h3>
          <button className="text-sm font-medium text-primary hover:underline">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100 dark:bg-meta-4">
                <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                  Order ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center">
                    <div className="flex justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  </td>
                </tr>
              ) : recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-[#eee] px-4 py-3 text-sm dark:border-strokedark">
                      #{order.id}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-3 text-sm dark:border-strokedark">
                      {order.customer?.name || getCustomerName(order.customer_id)}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-3 text-sm dark:border-strokedark">
                      {order.created_at ? formatDate(order.created_at) : 'N/A'}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-3 text-sm dark:border-strokedark">
                      {formatCurrency(order.total_price)}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-3 text-sm dark:border-strokedark">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === 'pending' 
                          ? 'bg-warning bg-opacity-10 text-warning' 
                          : order.status === 'completed' 
                          ? 'bg-success bg-opacity-10 text-success'
                          : 'bg-primary bg-opacity-10 text-primary'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ECommerce;