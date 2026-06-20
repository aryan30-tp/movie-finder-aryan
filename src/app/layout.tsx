'use client';

import React, { useEffect, useState } from "react";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { SplashWrapper } from "@/components/shared/SplashWrapper";
import DummyLogin  from "@/components/shared/DummyLogin";
import { AnimatePresence, motion } from "framer-motion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        {/* Ambient Mouse Tracker Glow Mesh */}
        <div 
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500 opacity-40 mix-blend-screen"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 46, 147, 0.05), rgba(255, 90, 54, 0.02), transparent 80%)`
          }}
        />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <SplashWrapper>
            <AnimatePresence mode="wait">
              {!isLoggedIn ? (
                <motion.div
                  key="login-gate"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <DummyLogin onLoginSuccess={() => setIsLoggedIn(true)} />
                </motion.div>
              ) : (
                <motion.div
                  key="main-app"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col min-h-screen w-full"
                >
                  <Navbar />
                  {/* Expanded cinema layout viewport dimensions matching high-end monitors perfectly */}
                  <main className="flex-grow flex flex-col px-4 sm:px-10 lg:px-16 max-w-[1600px] w-full mx-auto relative z-10">
                    {children}
                  </main>
                  <Footer />
                </motion.div>
              )}
            </AnimatePresence>
          </SplashWrapper>
        </div>
      </body>
    </html>
  );
}