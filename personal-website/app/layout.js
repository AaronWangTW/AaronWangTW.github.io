import "./globals.css";

export const metadata = {
  title: 'Aaron Wang',
  description: 'Welcome to my site!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Aaron Wang</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}