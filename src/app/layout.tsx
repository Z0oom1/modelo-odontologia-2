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
  title: "Honorato | Odontologia Estética & Biomimética",
  description: "Estúdio odontológico premium especializado em sorrisos harmônicos e biocompatíveis. Alinhadores invisíveis, lentes liquid glass e reabilitação biológica sob medida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="font-sans bg-background text-foreground">{children}</body>
    </html>
  );
}
