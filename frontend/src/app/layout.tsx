import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Longevity Coach',
  description: 'Blood biomarker optimization for longevity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-secondary-50 text-secondary-900 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
