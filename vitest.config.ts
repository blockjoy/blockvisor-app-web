import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ exportAsDefault: true })],
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./__tests__/utils.ts'],
  },
  resolve: {
    alias: {
      '@modules': path.resolve('./modules'),
      '@shared': path.resolve('./shared'),
      '@public': path.resolve('./public'),
    },
  },
});
