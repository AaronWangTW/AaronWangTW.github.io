import "./globals.css";

import { Doto } from 'next/font/google'
 
const doto = Doto({
  subsets: ['latin'],
})

export const metadata = {
  title: 'Aaron Wang\'s Website',
  description: 'Welcome to my site!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={doto.className}>
      <head>
        <title>Aaron Wang's Website</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}