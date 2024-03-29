import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import UserProfile from './pages/userProfile';
import Sale from './pages/Sale';
import BillReport from './pages/BillReport';
import DailySaleReport from './pages/DailySaleReport';
import MonthlySaleReport from './pages/MonthlySaleReport';


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
{
  path: "/",
  element: <Login/>
},{
  path: "/home",
  element: <Home/>
},{
  path: "/changeProfile",
  element: <UserProfile/>
},{
  path: "/product",
  element: <Product/>
},{
  path: "/sale",
  element: <Sale/>
},{
  path: "/billreport",
  element: <BillReport/>
},{
  path: "/dailysalereport",
  element: <DailySaleReport/>
},{
  path: "/monthlysalereport",
  element: <MonthlySaleReport/>
}
]) 
root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
