import { defineConfig } from '@farmfe/core';
import { NestPlugin } from './index.plugin';

export default defineConfig({
  // @ts-ignore
  plugins: [NestPlugin()],
});
