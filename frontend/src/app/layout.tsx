import type { Metadata } from "next";
import { DM_Serif_Text, Newsreader } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components";

const newsreader = Newsreader({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const dmSerifText = DM_Serif_Text({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif-text",
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
      <body className={`${dmSerifText.variable} ${newsreader.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
