import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "takuyawww",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#181824] via-[#232946] to-[#1a1a2e] overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-purple-800/40 to-blue-600/30 rounded-full blur-3xl z-0" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tr from-blue-900/30 to-purple-700/20 rounded-full blur-2xl z-0" />
          <div className="pointer-events-none absolute inset-0 z-10 mix-blend-soft-light opacity-40"
            style={{
              backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            }}
          />

          <div className="z-20 w-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
