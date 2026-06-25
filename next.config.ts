/** @type {import('next').NextConfig} */

const nextConfig = {

  allowedDevOrigins: [
    "192.168.0.112",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zdqbbvjrhvbkmqutssoy.supabase.co",
      },
    ],
  },

};

module.exports =
  nextConfig;