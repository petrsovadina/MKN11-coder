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
          {/* Background pattern - optimalizováno pro světlý i tmavý režim, ukotvené a do ztracena dole */}
          <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_100%,#000_70%,transparent_110%)]"></div>
          
          <div className="min-h-screen font-sans antialiased flex flex-col">
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
