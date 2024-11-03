import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/components/theme/theme-provider";
import CookiesDialog from "@/components/cookies-dialog";

export const metadata: Metadata = {
  title: "APY List",
  description:
    "Find the best APY rates from trusted financial platforms in real-time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} "antialiased bg-background"`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CookiesDialog />
        </ThemeProvider>
      </body>
    </html>
  );
}
