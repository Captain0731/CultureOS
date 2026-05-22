import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  sassOptions: {
    includePaths: [path.join(import.meta.dirname, "src")],
  },
};

export default nextConfig;
