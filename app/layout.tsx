import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Sora} from 'next/font/google'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const riking = localFont({
  src: "./fonts/CryptoHunter-E44Rj.ttf",
  variable: "--font-riking",
  weight: "100 900",
});
const font = Sora({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "AES",
  description: "CC Cryptographie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
        <body className={font.className}>
          {children}
          <Toaster />
        </body>
    </html>
  );
}


