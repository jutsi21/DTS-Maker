import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Cadence Studio', description: 'Offline-first parametric CAD studio' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
