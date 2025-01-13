import type { Metadata } from "next";
import { DM_Serif_Display, DM_Serif_Text } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NavBar } from "@/components";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-display",
});

const dmSerifText = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
});

const sansation = localFont({
  src: [
    {
      path: "../fonts/sansation/Sansation_Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sansation",
});

export const metadata: Metadata = {
  title: "Student Welfare Office, VIT Chennai",
  description: "Official website of the Student Welfare Office, VIT Chennai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" />
      <body
        className={`${dmSerifDisplay.variable} ${dmSerifText.variable} ${sansation.variable}`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
