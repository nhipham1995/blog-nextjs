/** @type {import('next').NextConfig} */
// require('dotenv').config()
module.exports = {
  // reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  serverRuntimeConfig: {
    graphqlAPI: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT,
    request: process.env.GRAPHCMS_TOKEN
}
}
