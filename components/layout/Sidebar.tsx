'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Zap,
  BarChart3,
  Search,
  TrendingUp,
  Map,
  CheckCircle,
  History,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const navigationItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
    description: 'View your analysis',
  },
  {
    label: 'Analyze Idea',
    href: '/analyze',
    icon: Zap,
    description: 'Submit new idea',
  },
  {
    label: 'Research',
    href: '/research',
    icon: Search,
    description: 'View findings',
  },
  {
    label: 'Pivot Suggestions',
    href: '/pivot',
    icon: TrendingUp,
    description: 'Pivoting strategies',
  },
  {
    label: 'Roadmap',
    href: '/roadmap',
    icon: Map,
    description: 'Action plan',
  },
  {
    label: 'Validation',
    href: '/validation',
    icon: CheckCircle,
    description: 'Assumptions',
  },
  {
    label: 'History',
    href: '/history',
    icon: History,
    description: 'Past analyses',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Configuration',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card-dark border border-slate-700 text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-black border-r border-slate-800 p-6 z-40',
          'transition-transform duration-300 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="mb-8 mt-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            FounderLens
          </h1>
          <p className="text-xs text-slate-400 mt-1">Validate Your Ideas Faster</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <div
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  )}
                >
                  <Icon size={20} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <div className="h-px bg-slate-800" />
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all duration-200">
            <LogOut size={20} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
