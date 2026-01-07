import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Shield, History, Settings, Zap } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', icon: LayoutDashboard, labelKey: 'dashboard' as const },
  { path: '/scanner', icon: Shield, labelKey: 'scanner' as const },
  { path: '/history', icon: History, labelKey: 'history' as const },
  { path: '/settings', icon: Settings, labelKey: 'settings' as const },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { t, isRTL } = useTranslation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'sidebar fixed top-0 h-full w-[280px] bg-sidebar border-r border-border z-50',
          'flex flex-col transition-transform duration-300',
          isRTL ? 'right-0' : 'left-0',
          isOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-border">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-emerald flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan to-emerald blur-lg opacity-50" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">CyberLens</h1>
            <p className="text-xs text-muted-foreground">AI Security</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn('nav-link', isActive && 'active')}
              >
                <Icon className="w-5 h-5" />
                <span>{t.nav[item.labelKey]}</span>
                {isActive && (
                  <div className={cn(
                    'absolute w-1 h-6 bg-primary rounded-full',
                    isRTL ? 'right-0' : 'left-0'
                  )} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="glass-card p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
              <span className="text-sm text-emerald">System Active</span>
            </div>
            <p className="text-xs text-muted-foreground">
              AI Engine v2.0.1
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
