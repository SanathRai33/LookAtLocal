import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen transition-colors duration-200 bg-background-light dark:bg-dark-200">

      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;