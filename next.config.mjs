/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors:true
    },
    reactStrictMode: false,
    experimental: {
       
        serverComponentsExternalPackages: ["mongoose"],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      images: {
        remotePatterns: [
            {
                protocol:"https",
                hostname:"utfs.io"
            },
            {
                protocol:"https",
                hostname:"uploadthing.com"
            },
            {
                protocol:"https",
                hostname:"lh3.googleusercontent.com"
            }
        ]
      }
          
};

export default nextConfig;
