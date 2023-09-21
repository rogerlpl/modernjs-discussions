import { appTools, defineConfig } from '@modern-js/app-tools';
import { garfishPlugin } from '@modern-js/plugin-garfish';
import { expressPlugin } from '@modern-js/plugin-express';
import { bffPlugin } from '@modern-js/plugin-bff';

export default defineConfig({
  dev: {
    port: 4001
  },
  runtime: {
    router: true,
    state: true,
  },
  deploy: {
    microFrontend: true,
  },
  plugins: [appTools(), garfishPlugin(), expressPlugin(), bffPlugin()],
});