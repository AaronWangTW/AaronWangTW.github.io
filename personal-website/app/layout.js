import "./globals.css";
import MainLayout from "./components/layout/mainLayout";

export const metadata = {
  title: 'Your Personal Website',
  description: 'Welcome to my site!',
};

import { Felipa, Lovers_Quarrel, Roboto } from 'next/font/google';

const felipa = Felipa({ subsets: ['latin'], weight: '400', variable: '--font-felipa' });
const lovers = Lovers_Quarrel({ subsets: ['latin'], weight: '400', variable: '--font-lovers' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.className} ${felipa.className} ${lovers.className}`}>
      <head>
        <title>Aaron Wang</title>
      </head>
      <body className="font-felipa">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}