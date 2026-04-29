import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IronStack Social Bot',
  description: 'Panel de gestión social con IA para IronStack Studio',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
