import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; // `import.meta.url` ile uyumlu hale getirmek için

// `__dirname` tanımlaması
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.gr-assets.com", // Goodreads resimleri için hostname
      },
    ],
    unoptimized: true, // Tüm resimler için optimizasyonu devre dışı bırakır
  },
};

export default nextConfig;
