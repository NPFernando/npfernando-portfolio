import { fileURLToPath } from 'node:url';
import process from 'node:process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async () => {
  const analyze = process.env.ANALYZE === 'true';
  let visualizerPlugin: any = null;
  if (analyze) {
    try {
      // @ts-ignore optional dependency resolved at runtime
      const { visualizer } = await import('rollup-plugin-visualizer');
      visualizerPlugin = visualizer({
        filename: 'dist/bundle-report.html',
        gzipSize: true,
        brotliSize: true,
        template: 'treemap',
      });
    } catch {
      console.warn('Visualizer not installed. Run `npm install -D rollup-plugin-visualizer` to enable reports.');
    }
  }
  return {
    plugins: [react(), analyze && visualizerPlugin].filter(Boolean),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      target: 'es2022',
    },
  };
});
