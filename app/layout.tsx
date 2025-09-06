import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter, Roboto } from "next/font/google"; // add new fonts
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

// New fonts
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // required
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // common weights for Roboto
});

const baseUrl = 'https://headline-widget-l3o9-reborn.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Headline Preview Demo",
  description: "Designed By L3o9-reborn",
  keywords: [
    "HeadLine",
    "Widget",
    "Headline Widget",
    "Headline Generator",
    "Munna Hasan Leon",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Full Stack",
    "Web Development",
  ],
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
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${inter.variable} ${roboto.variable} antialiased`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
