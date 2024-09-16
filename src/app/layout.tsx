// /app/layout.tsx

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Deyvi Sanchez",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"> {/* Aquí está la etiqueta <html> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children} {/* Aquí se renderizan los componentes hijos, como page.tsx */}
      </body>
    </html>
  );
}
