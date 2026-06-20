import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { SplashWrapper } from "@/components/shared/SplashWrapper";

export const metadata: Metadata = {
  title: "Watchit - Movie Discovery Engine",
  description: "Browse, discover, search, and track your favorite silver-screen achievements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-textPrimary antialiased selection:bg-brand-accent selection:text-white">
        <SplashWrapper>
          <Navbar />
          <main className="flex-grow flex flex-col px-4 sm:px-8 py-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
          <Footer />
        </SplashWrapper>
      </body>
    </html>
  );
}