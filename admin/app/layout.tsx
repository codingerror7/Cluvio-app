import type { Metadata } from 'next';
import './globals.css';
import { AdminShell } from '@/components/layout/AdminShell';

export const metadata: Metadata = {
  title: 'Cluvio Admin | College Club Management Platform',
  description: 'Enterprise administration control center for college clubs, student engagement, and leadership.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased bg-[#F8F9FA] text-[#111827]">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
