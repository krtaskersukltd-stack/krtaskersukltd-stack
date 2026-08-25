import type { Metadata } from 'next';
import './globals.css';

export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title: 'KR Tasker Tracker | Employee Monitoring & Operational Management',
  description: 'Enterprise operational efficiency system with smart employee activity monitoring, data tables, and task tracking.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#f0fbff] text-[#041f24]">
        {children}
      </body>
    </html>
  );
}

