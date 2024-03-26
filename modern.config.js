import appTools, { defineConfig } from '@modern-js/app-tools';
import garfishPlugin from '@modern-js/plugin-garfish';
import bffPlugin from '@modern-js/plugin-bff';
import expressPlugin from '@modern-js/plugin-express';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  deploy: {
    microFrontend: true,
  },
  dev: {
    // set publicPath, la ip debe de ser la del desarrollador.
    assetPrefix: process.env.DEV_ASSET_PREFIX,
  },
  bff: {
    // prefix: '/api/pokemon',
    prefix: process.env.BFF_PREFIX,
  },
  server: {
    // port: 3003,
    port: process.env.SERVER_PORT,
  },
  plugins: [appTools(), garfishPlugin(), bffPlugin(), expressPlugin()],
});
