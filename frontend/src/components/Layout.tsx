import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { token } = useAuth();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
        {!token && (
          <Button variant="outline" disabled>
            Placeholder
          </Button>
        )}
      </header>
      <main className="max-w-2xl mx-auto">{children}</main>
    </div>
  );
};

export default Layout;