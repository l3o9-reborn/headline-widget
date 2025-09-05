import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/utils/ThemeProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl= 'https://munnahleon.vercel.app'

export const metadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: "Headline Preview Demo",
    description: "Designed By L3o9-reborn",
    keywords: ["Munna Hasan Leon", "Full Stack Developer", "Next.js", "React", "TypeScript", "Portfolio", "Full Stack", "Web Development"],
    authors: [{ name: "Munna Hasan Leon", url: baseUrl }],
    creator: "L3o9 Reborn",
};



 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
