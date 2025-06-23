import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Blood Tests',
    href: '/blood-tests',
  },
  {
    name: 'Protocols',
    href: '/protocols',
  },
  {
    name: 'Analytics',
    href: '/analytics',
  },
  {
    name: 'Journey',
    href: '/journey',
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
