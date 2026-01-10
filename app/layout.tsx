import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "./components/SmoothScrolling"; // Import the engine
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "Kuber Resort | Sardarshahar",
  description: "Luxury Hotel, Banquet Hall & Marriage Garden in Sardarshahar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SmoothScrolling /> {/* <--- The Magic Engine runs here */}
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}