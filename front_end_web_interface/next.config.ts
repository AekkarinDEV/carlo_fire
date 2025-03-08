import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    BACK: process.env.URL_BACK
  }
};

export default nextConfig;
