import "./globals.css";
import MainLayout from "./components/layout/mainLayout";

export const metadata = {
  title: 'Your Personal Website',
  description: 'Welcome to my site!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}