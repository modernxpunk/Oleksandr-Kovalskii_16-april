/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "upload.wikimedia.org",
            "m.media-amazon.com",
            "images-na.ssl-images-amazon.com",
            "cdn7.antedote.com",
            "is4-ssl.mzstatic.com",
            "vinyla.com",

        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')]
    }
}

module.exports = nextConfig
