import { Inter } from 'next/font/google';
import '../globals.css';
import NavbarUp from '@/components/layout/NavbarUp';

export default function AuthLayout({
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
