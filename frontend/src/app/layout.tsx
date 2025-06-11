import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Layout from '@/components/layout/Layout';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Longevity Coach | Optimize Your Healthspan',
    template: '%s | Longevity Coach',
  },
  description: 'Optimize your healthspan through personalized blood biomarker analysis and evidence-based longevity strategies.',
  keywords: ['longevity', 'health optimization', 'biomarkers', 'healthspan', 'longevity coach'],
  authors: [{ name: 'Longevity Coach Team' }],
  creator: 'Longevity Coach',
  publisher: 'Longevity Coach',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://longevitycoach.app',
    title: 'Longevity Coach | Optimize Your Healthspan',
    description: 'Optimize your healthspan through personalized blood biomarker analysis and evidence-based longevity strategies.',
    siteName: 'Longevity Coach',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Longevity Coach | Optimize Your Healthspan',
    description: 'Optimize your healthspan through personalized blood biomarker analysis and evidence-based longevity strategies.',
    creator: '@longevitycoach',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-white text-gray-900 antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
