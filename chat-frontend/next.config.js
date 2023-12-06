/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: 'https://teste-pfac-pedro-henrique-s-projects.vercel.app/' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
                ],
            },
        ];
    },
}

module.exports = nextConfig
