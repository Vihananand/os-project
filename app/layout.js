import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import Navigation from './components/Navigation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'OS Concepts - Banker\'s Algorithm',
  description: 'A modern web application demonstrating key operating system concepts, featuring an interactive implementation of the Banker\'s Algorithm for deadlock avoidance.',
  keywords: 'operating systems, banker\'s algorithm, deadlock avoidance, resource allocation, next.js, react, tailwind css',
  authors: [{ name: 'Vihan Anand' }],
  openGraph: {
    title: 'OS Concepts - Banker\'s Algorithm',
    description: 'Interactive implementation of the Banker\'s Algorithm for deadlock avoidance',
    type: 'website',
    url: 'https://os-project.vercel.app',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OS Concepts Project Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OS Concepts - Banker\'s Algorithm',
    description: 'Interactive implementation of the Banker\'s Algorithm for deadlock avoidance',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body suppressHydrationWarning>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-card-bg border-t border-card-border py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-text-secondary">
                Made by techies🖥️ Vihan, Abhinav, Tanish
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
