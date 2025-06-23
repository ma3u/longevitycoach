import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-indigo-600">404</h1>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It doesn&apos;t exist or has been moved.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link href="/">
            <Button className="px-6 py-3 text-base font-medium">
              Go back home
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link href="/contact" className="font-medium text-indigo-600 hover:text-indigo-500">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
