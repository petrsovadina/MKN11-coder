import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import FooterSection from "@/components/FooterSection";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "MKN-11 Asistované Kódování",
  description: "Automatické kódování diagnóz pomocí umělé inteligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="mkn-theme"
        >
          <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <FooterSection />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
