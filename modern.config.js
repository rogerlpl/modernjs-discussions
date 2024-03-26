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
  bff: {
    prefix: '/api/pokemon',
  },
  server: {
    port: 3003,
  },
  plugins: [appTools(), garfishPlugin(), bffPlugin(), expressPlugin()],
});
