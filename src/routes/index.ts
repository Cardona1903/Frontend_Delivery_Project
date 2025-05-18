import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Demo= lazy(() => import('../pages/Demo'));
const Drivers = lazy(() => import('../pages/Driver'));
const Orders = lazy(() => import('../pages/Order'));
const Customers = lazy(() => import('../pages/Customer'));  
const Motorcycles = lazy(() => import('../pages/Motorcycle'));
const Addresses = lazy(() => import('../pages/Address'));
const Issues = lazy(() => import('../pages/Issue'));
const Menu = lazy(() => import('../pages/Menu'));
const Photo = lazy(() => import('../pages/Photo'));
const Restaurants = lazy(() => import('../pages/Restaurant'));
const Products = lazy(() => import('../pages/Product'));
const Shifts = lazy(() => import('../pages/Shift'));

const coreRoutes = [
  {
    path: '/shift',
    title: 'Shift',
    component: Shifts,
  },
  {
    path: '/product',
    title: 'Product',
    component: Products,
  },
  {
    path: '/restaurant',
    title: 'Restaurant',
    component: Restaurants,
  },
  {
    path: '/photo',
    title: 'Photo',
    component: Photo,
  },
  {
    path: '/address',
    title: 'Address',
    component: Addresses,
  },
  {
    path: '/issue',
    title: 'Issue',
    component: Issues,
  },
  {
    path: '/menu',
    title: 'Menu',
    component: Menu,
  },
  {
    path: '/order',
    title: 'Order',
    component: Orders,
  },
  {
    path: '/customer',
    title: 'Customer',
    component: Customers,
  },
  {
    path: '/motorcycles',
    title: 'Motorcycle',
    component: Motorcycles,
  },
  {
    path: '/driver',
    title: 'Driver',
    component: Drivers,
  },
  {
    path: '/demo',
    title: 'Demo',
    component: Demo,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
