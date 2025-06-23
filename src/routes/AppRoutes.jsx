import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import AppLayout from '../layouts/Applayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import BookingPage from '../pages/BookingPage';
import SearchResults from '../pages/SearchResults';
import HotelsPage from '../pages/Hotels';
import HotelDetails from '../pages/HotelDetails';
import Login from '../pages/Login';
import ProtectedRoute from '../pages/ProtectedRoutes';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '', element: <Home  /> },
      { path: 'hotels', element: (<ProtectedRoute><HotelsPage /></ProtectedRoute>) },
       { path: 'hotels/:id', element: <HotelDetails /> }, 
       {path:'login',element:<Login/>},
       { path: "search/:city", element:(<ProtectedRoute><SearchResults /></ProtectedRoute>) },
      { path: "booking/:id", element: <BookingPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
