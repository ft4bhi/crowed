import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavBar from "@/components/bottomNavbar";
import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "OlexCows - Livestock Marketplace",
    description: "Buy and sell livestock with ease. AI-powered breed detection.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                suppressHydrationWarning={true}
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
            >
                <Sidebar />
                <div className="flex flex-col min-h-screen md:pl-64">
                    <MobileHeader />
                    <main className="flex-1 md:pb-0">
                        {children}
                    </main>
                    <BottomNavBar />
                </div>
            </body>
        </html>
    );
}
