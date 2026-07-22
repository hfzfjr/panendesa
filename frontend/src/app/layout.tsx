import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PanenDesa - Koordinasi Rantai Pasok Desa",
  description: "Sistem web yang mengoordinasikan seluruh proses rantai pasok hasil pertanian dan perkebunan di tingkat desa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]">{children}</body>
    </html>
  );
}
