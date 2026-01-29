/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'i.ibb.co' },
            { protocol: 'https', hostname: 'loremflickr.com' },
            { protocol: 'https', hostname: 'www.crownintltravels.com' },
            { protocol: 'https', hostname: 'kodesolution.com' },
            { protocol: 'https', hostname: 'creativelayers.net' },
            { protocol: 'https', hostname: 'rn53themes.net' },
            { protocol: 'https', hostname: 'flowbite.s3.amazonaws.com' },
        ],
    },
}

export default nextConfig;
