import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import UrlProvider from './urlProvider';
import { useState } from 'react';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Url:Jam',
  description: 'Generate short urls',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <div className="container mx-auto py-4 px-6">
          <header className="cursor-default text-center text-lg py-6 pb-1 text-white">
            <h1 className="text-sm text-slate-400">shorten a url</h1>
            <div className="text-[3rem] py-4 tracking-tight font-bold drop-shadow-xl">
              url:
              <span className="text-lime-400 hover:text-lime-600 transition-colors tracking-tight">
                jam
              </span>
            </div>
          </header>
          <UrlProvider>{children}</UrlProvider>
        </div>
      </body>
    </html>
  );
}
