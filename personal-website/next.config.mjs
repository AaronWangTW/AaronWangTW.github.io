/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/person-website",
    output: "export",  // <=== enables static exports
    reactStrictMode: true,
};

export default nextConfig;
