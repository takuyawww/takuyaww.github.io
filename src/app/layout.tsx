import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

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
  description: "Personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('error', function(e) {
                if (e.target && e.target.tagName === 'IMG' && e.target.closest('.link-card-image')) {
                  e.target.style.display = 'none';
                }
              }, true);
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-mainbg text-white`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 max-w-3xl mx-auto px-6 sm:px-8 w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
