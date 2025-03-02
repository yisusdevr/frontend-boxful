'use client';
import { Albert_Sans } from 'next/font/google';

import Navbar from '@/components/Navbar';

import Login from '@/components/login';
const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={albertSans.className}>
      <body style={{ margin: 0, padding: 0 }}>
        <Navbar />
        
        <main style={{ paddingTop: '4px' }}>
       <Login />
        </main>
      </body>
    </html>
  );
}