import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // O CSS é pequeno, então embuti-lo no HTML elimina a requisição que
    // bloqueia a renderização e antecipa o LCP.
    inlineCss: true,
  },
};

export default nextConfig;
