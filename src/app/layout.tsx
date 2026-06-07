import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reynaldo Arya | Data Scientist & ML Engineer",
  description:
    "Portfolio of Reynaldo Arya Budi Trisna — Content Moderator, Robotics & AI Graduate, AI/ML & Data Enthusiast. Explore projects, skills, and experience.",
  keywords: [
    "Reynaldo",
    "Data Scientist",
    "ML Engineer",
    "Portfolio",
    "AI",
    "Machine Learning",
    "IoT",
  ],
  authors: [{ name: "Reynaldo Arya Budi Trisna" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Reynaldo Arya | Data Scientist & ML Engineer",
    description:
      "Portfolio of Reynaldo — Content Moderator, Robotics & AI Graduate, AI/ML & Data Enthusiast.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
