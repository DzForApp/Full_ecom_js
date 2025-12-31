import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import NavbarUp from '@/components/layout/NavbarUp';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Auto Parts Store - Pièces auto de qualité',
    description: 'Votre destination pour des pièces automobiles de qualité',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" dir="rtl">
            <body className={`${inter.className} bg-gray-50 font-sans font-bold `}>
                <div className="min-h-screen flex flex-col">
                    <NavbarUp />
                    <Navbar />
                    <main className="flex-grow container mx-auto px-0 py-2">

                        {children}
                    </main>
                    <Footer />
                </div>
                <Toaster position="top-right" />
            </body>
        </html>
    );
}