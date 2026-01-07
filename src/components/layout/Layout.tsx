import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isRTL } = useTranslation();

  return (
    <div className="min-h-screen bg-background mesh-gradient">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className={cn(
        'main-content transition-all duration-300',
        isRTL ? 'lg:mr-[280px]' : 'lg:ml-[280px]'
      )}>
        <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
