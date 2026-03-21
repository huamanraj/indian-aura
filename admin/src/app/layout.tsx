import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Indian Aura - Admin Panel',
  description: 'Admin panel for Indian Aura',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
