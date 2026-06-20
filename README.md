# 🎬 Watchit - Premium Movie Discovery Engine

A high-performance cinematic exploration platform built with Next.js, TypeScript, and Tailwind CSS. The engine bridges dynamic server-side TMDB API discovery streams with fluid client-side states, secure landing gates, and hardware-accelerated layouts.

---

## 🛠️ Complete Local Installation & Execution Guide

Follow these exact steps to stand up and run the codebase cleanly on your local workstation:

### 1. Prerequisites
Ensure you have the modern LTS version of Node.js installed (v18.x or higher recommended).

### 2. Clone the Ecosystem Repository
Clone the codebase down into your local directory tracks using your terminal:

    git clone https://github.com/aryan30-tp/movie-finder-aryan.git
    cd movie-finder-aryan

### 3. Install Core Dependency Packages
Execute the package installer to restore all architectural dependencies completely:

    npm install

### 4. Configure Your Project Environment
Open your project's strongly-typed TypeScript configuration file `next.config.ts` and ensure it is configured to whitelist the TMDB content delivery network:

    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'image.tmdb.org',
            port: '',
            pathname: '/t/p/**',
          },
        ],
      },
    };

    export default nextConfig;

### 5. Inject Your Environment Credential Keys
Create a local environment configuration file in the absolute root of the workspace directory:

    touch .env.local

Open `.env.local` and paste your TMDB API Read Access Token (v4) string under the public variable handle:

    NEXT_PUBLIC_TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9...your_actual_very_long_v4_token_string_here...

(Note: Do not use the short v3 API key string, as the modern authorization header engine requires the secure v4 token wrapper format to pass validation checkpoints).

### 6. Launch the Localized Development Server
Fire up the Next.js compiler engine:

    npm run dev

Open your web browser and navigate to the local environment host stream address:

    http://localhost:3000

Your premium landing portal experience will launch live with zero compile warnings!

---

## 🏗️ Production Compilation & Testing
To evaluate how the application compiles optimized production asset chunk-trees, execute the build workflow commands sequentially:

    # Compiles and checks strict TypeScript typings formatting constraints
    npm run build

    # Runs the compiled production build locally for verification testing
    npm run start