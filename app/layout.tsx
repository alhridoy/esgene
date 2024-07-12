import '@/styles/globals.css';
import { Metadata } from 'next';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    default: 'ESGene',
    template: 'ESGene',
  },
  description:
    'A sustainability report fact-checker for financial analysts & investors.',
  openGraph: {
    title: 'ESGene',
    description:
      'A sustainability report fact-checker for financial analysts & investors.',
    images: [`/api/og?title=ESGene`],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
