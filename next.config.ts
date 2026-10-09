import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Next.js needs 'unsafe-eval' for React Refresh in development only.
// 'unsafe-inline' is still required for the framework's inline bootstrap
// scripts (a nonce-based CSP would require middleware; revisit if Threat
// Model demands it).
const scriptSrc = isDev
  ? "'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://*.clarity.ms"
  : "'self' 'unsafe-inline' https://www.clarity.ms https://*.clarity.ms";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            // Enforce HTTPS for two years, including subdomains, and allow
            // preloading once the deployment is confidently HTTPS-only.
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
