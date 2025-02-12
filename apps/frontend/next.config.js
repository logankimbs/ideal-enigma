const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    distDir: '../../dist/apps/frontend/.next',
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // Only load @nx/next in development
    const { composePlugins, withNx } = require('@nx/next');
    const plugins = [withNx];

    nextConfig.nx = { svgr: false };

    return composePlugins(...plugins)(nextConfig);
  }

  return nextConfig;
};
