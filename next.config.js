/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
}

module.exports = {
  nextConfig,
  images: {
    domains: ['flowbite.com', 'flowbite.s3.amazonaws.com'],
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  },
  env: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID:process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    NEXT_PUBLIC_API_KEY:process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_AUTH_DOMAIN:process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    NEXT_PUBLIC_PROJECT_ID:process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_STORAGE_BUCKET:process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    NEXT_PUBLIC_MESSAGING_SENDER_ID:process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_APP_ID:process.env.NEXT_PUBLIC_APP_ID,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    DECRYPT_KEY:process.env.DECRYPT_KEY
  }
}

