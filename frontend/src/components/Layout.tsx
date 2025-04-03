import React from 'react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <Button variant="outline">Placeholder</Button>
      </header>
      <main className="max-w-2xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;