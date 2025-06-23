// AppLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Headers/Navbar';
export default function AppLayout() {
  return (
    <main className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar/>
  <Outlet />
</main>

  );
}
