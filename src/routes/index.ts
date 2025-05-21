import { lazy } from 'react';

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
const ListUsers = lazy(() => import('../pages/Users/page')); 
const ListDrivers = lazy(() => import('../pages/Drivers/page'));
const ListMotorcycles = lazy(() => import('../pages/Motorcycles/page'));
const ListShifts = lazy(() => import('../pages/Shifts/page'));
const ListIssues = lazy(() => import('../pages/Issues/page'));
const ListCustomers = lazy(() => import('../pages/Customers/page'));
const ListRestaurants = lazy(() => import('../pages/Restaurants/page'));
const ListOrders = lazy(() => import('../pages/Orders/page'));
const ListMenus = lazy(() => import('../pages/Menus/page'));
const ListPhotos = lazy(() => import('../pages/Photos/page'));
const ListProducts = lazy(() => import('../pages/Products/page'));
const ListAddresses = lazy(() => import('../pages/Addresses/page'));
const CreateAddresses = lazy(() => import('../pages/Addresses/create'));
const CreateOrder = lazy(() => import('../pages/Orders/create'));
const CreateCustomers = lazy(() => import('../pages/Customers/create'));
const CreateDrivers = lazy(() => import('../pages/Drivers/create'));
const CreateMotorcycles = lazy(() => import('../pages/Motorcycles/create'));
const CreateRestaurants = lazy(() => import('../pages/Restaurants/create'));
const CreateMenus = lazy(() => import('../pages/Menus/create'));
const CreateProducts = lazy(() => import('../pages/Products/create'));
const CreatePhotos = lazy(() => import('../pages/Photos/create'));
const CreateIssues = lazy(() => import('../pages/Issues/create'));
const CreateShifts = lazy(() => import('../pages/Shifts/create'));
const CreateUsers = lazy(() => import('../pages/Users/create'));
const TrackOrder = lazy(() => import('../pages/TrackOrder'));
const Infringement = lazy(() => import('../pages/Infringement'));
const ListInfringements = lazy(() => import('../pages/Infringement/page'));
const CreateInfringement = lazy(() => import('../pages/Infringement/create'));
const ListMotorcycleInfringements = lazy(() => import('../pages/MotorcycleInfringement/page'));
const CreateMotorcycleInfringement = lazy(() => import('../pages/MotorcycleInfringement/create'));

const coreRoutes = [
  {
    path: '/CreateMotorcycleInfringement',
    title: 'Create Motorcycle Infringement',
    component: CreateMotorcycleInfringement,
  },
  {
    path: '/ListMotorcycleInfringements',
    title: 'List Motorcycle Infringements',
    component: ListMotorcycleInfringements,
  },
  {
    path: 'ListInfringements',
    title: 'List Infringements',
    component: ListInfringements,
  },
  {
    path: '/createInfringements',
    title: 'CreateInfringement', 
    component: CreateInfringement,
  },
  {
    path: '/infringement',
    title: 'Infringement',
    component: Infringement,
  },
  {
  path: '/TrackOrder',
  title: 'Track Order',
  component: TrackOrder,
  },
  {
    path: '/createShifts',
    title: 'Create Shifts',
    component: CreateShifts,
  },
  {
    path: '/createIssues',
    title: 'Create Issues',
    component: CreateIssues,
  },
  {
    path: '/createPhotos',
    title: 'Create Photos',
    component: CreatePhotos,
  },
  {
    path: '/createProducts',
    title: 'Create Products',
    component: CreateProducts,
  },
  {
    path: '/createMenus',
    title: 'Create Menus',
    component: CreateMenus,
  },
  {
    path: '/createRestaurants',
    title: 'Create Restaurants',
    component: CreateRestaurants,
  },
  {
    path: '/createMotorcycles',
    title: 'Create Motorcycles',
    component: CreateMotorcycles,
  },
  {
    path: '/createDrivers',
    title: 'Create Drivers',
    component: CreateDrivers,
  },
  {
    path: '/createCustomers',
    title: 'Create Customers',
    component: CreateCustomers,
  },
  {
    path: '/createUsers',
    title: 'Create Users',
    component: CreateUsers,
  },
  {
    path: '/createOrder',
    title: 'Create Order',
    component: CreateOrder,
  },
  {
    path: '/createAddress',
    title: 'Create Address',
    component: CreateAddresses,
  },
  {
    path: '/ListAddresses',
    title: 'Addresses',
    component: ListAddresses,
  },
  {
    path: '/ListPhotos',
    title: 'Photos',  
    component: ListPhotos,
  },
  {
    path: '/ListMenus',
    title: 'Menus',
    component: ListMenus,
  },
  {
    path: '/ListProducts',
    title: 'Products',
    component: ListProducts,
  },
  {
    path: '/ListOrders',
    title: 'Orders',
    component: ListOrders,
  },
  {
    path: '/ListRestaurants',
    title: 'Restaurants',
    component: ListRestaurants,
  },
  {
    path: '/ListMotorcycles',
    title: 'Motorcycles',
    component: ListMotorcycles,
  },
  {
    path: '/ListShifts',
    title: 'Shifts', 
    component: ListShifts,
  },
  {
    path: '/ListIssues',
    title: 'Issues',
    component: ListIssues,
  },
  {
    path: '/ListCustomers',
    title: 'Customers',
    component: ListCustomers,
  },
  {
    path: '/ListDrivers',
    title: 'Drivers',
    component: ListDrivers,
  },
   {
    path: '/ListUsers',
    title: 'ListUsers',
    component: ListUsers,
  },
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
