import type { Metadata } from "next";
import { DM_Serif_Text, Newsreader } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";

const newsreader = Newsreader({
  weight: ["200","300","400","500","600","700","800"],
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSerifText.variable} font-optical ${newsreader.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <NavBar />
          {children}
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
