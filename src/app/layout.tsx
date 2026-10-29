import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Reynaldo Arya Budi Trisna — AI video editor and social media data analyst based in Bali. Award-winning short film editor with a B.Eng in Robotics & AI.";

export const metadata: Metadata = {
  title: "Reynaldo Arya — AI Video Editor & Data Analyst",
  description,
  keywords: [
    "Reynaldo Arya",
    "AI Video Editor",
    "Video Editor Bali",
    "Social Media Analyst",
    "Data Analyst",
    "Portfolio",
  ],
  authors: [{ name: "Reynaldo Arya Budi Trisna" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Reynaldo Arya — AI Video Editor & Data Analyst",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reynaldo Arya — AI Video Editor & Data Analyst",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
