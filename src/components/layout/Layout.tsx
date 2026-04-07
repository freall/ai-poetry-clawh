import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-paper)] flex flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};
