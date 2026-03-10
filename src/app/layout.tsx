import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AEROSPACE.OS | Geofencing & GPS Spoofing Detection",
  description: "A modern monitoring platform for geofencing and GPS spoofing detection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen flex flex-col font-sans bg-[#050505] text-[#e0e0e0]`}
      >
        <Navbar />
        <main className="flex-grow pt-16 selection:bg-blue-500/20 selection:text-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
