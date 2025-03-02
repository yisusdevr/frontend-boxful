import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-albert-sans',
});

export const metadata: Metadata = {
  title: "Boxful App",
  description: "Boxful shipping application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${albertSans.variable}`}>
      <body className={albertSans.className}>
        {children}
      </body>
    </html>
  );
}
