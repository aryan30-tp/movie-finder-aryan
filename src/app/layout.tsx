'use client';

import React, { useEffect, useState } from "react";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { SplashWrapper } from "@/components/shared/SplashWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-textPrimary antialiased selection:bg-brand-accent selection:text-white relative min-h-screen overflow-x-hidden">
        {/* Subtle Neon Radial Glow Tracker */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-40 mix-blend-screen"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 46, 147, 0.06), rgba(255, 90, 54, 0.02), transparent 80%)`
          }}
        />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <SplashWrapper>
            <Navbar />
            <main className="flex-grow flex flex-col px-4 sm:px-8 py-8 max-w-7xl w-full mx-auto relative z-10">
              {children}
            </main>
            <Footer />
          </SplashWrapper>
        </div>
      </body>
    </html>
  );
}