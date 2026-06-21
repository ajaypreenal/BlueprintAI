'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/AuthContext';
import { goToGoogleLogin } from '@/lib/auth';
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

function NavLinks({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || pathname?.startsWith(item.href);
        const href = sessionId ? `${item.href}?session_id=${sessionId}` : item.href;
        return (
          <Link key={item.href} href={href} onClick={onNavigate}>
            <div
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200',
                isActive
                  ? 'bg-primary/10 border border-primary/30 text-primary'
                  : 'text-muted hover:text-ink hover:bg-ink/5 border border-transparent'
              )}
            >
              <Icon size={20} />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

function NavLinksFallback() {
  return (
    <>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-transparent text-muted">
              <Icon size={20} />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, loading, logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card-dark border border-border-soft text-ink"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-screen w-64 bg-card-dark border-r border-border-soft p-6 z-40',
          'transition-transform duration-300 md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="mb-8 mt-4">
          <h1 className="text-2xl font-serif font-semibold text-primary">
            BlueprintAI
          </h1>
          <p className="text-xs text-muted mt-1">Validate Your Ideas Faster</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 mb-8">
          <Suspense fallback={<NavLinksFallback />}>
            <NavLinks onNavigate={() => setIsOpen(false)} />
          </Suspense>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <div className="h-px bg-border-soft" />
          {!loading && user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2">
                {user.picture && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.picture} alt={user.name || 'Account'} className="w-8 h-8 rounded-full border border-border-soft" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{user.name}</p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:text-ink hover:bg-ink/5 transition-colors duration-200"
              >
                <LogOut size={20} />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </>
          ) : (
            <button
              onClick={goToGoogleLogin}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted hover:text-ink hover:bg-ink/5 transition-colors duration-200"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          )}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-ink/30 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
