import Link from 'next/link';

import { MainNav } from './MainNav';
import { UserNav } from './UserNav';

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">Longevity Coach</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <MainNav />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
