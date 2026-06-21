'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
