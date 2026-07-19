import type { Metadata } from "next";
import { Anton, Bebas_Neue, Space_Grotesk, Oswald } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deva Mithran — Game Artist",
  description:
    "Portfolio of Deva Mithran: character design, digital illustration, and concept art. Every character starts as a shape before it becomes a face.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anton.variable} ${bebas.variable} ${spaceGrotesk.variable} ${oswald.variable}`}
    >
      <body className="font-body antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          <CustomCursor />
          <div className="grain" aria-hidden="true" />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
