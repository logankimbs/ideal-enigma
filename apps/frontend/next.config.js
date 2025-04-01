const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    distDir: '../../dist/apps/frontend/.next',

    env: {
      NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    const { composePlugins, withNx } = require('@nx/next');
    const plugins = [withNx];

    nextConfig.nx = { svgr: false };

    return composePlugins(...plugins)(nextConfig);
  }

  return nextConfig;
};
