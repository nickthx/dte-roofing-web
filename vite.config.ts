import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // react-helmet-async ships as CJS; bundle it into the SSR output so the
    // prerender script's dynamic import resolves its named exports as ESM.
    noExternal: ['react-helmet-async'],
  },
  // Client build only. The SSR build keeps Rollup defaults so the lazy route
  // chunks resolve as plain dynamic imports in Node during prerender.
  build: isSsrBuild
    ? undefined
    : {
        // Emit .vite/manifest.json so scripts/prerender.mjs can map each route to
        // its chunk and inject modulepreload hints.
        manifest: true,
        rollupOptions: {
          output: {
            // Split rarely-changing vendor code out of per-route chunks so it is
            // cached once and shared across all lazy-loaded routes.
            manualChunks(id) {
              if (!id.includes('node_modules')) return undefined;
              if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler|react-helmet-async)[\\/]/.test(id)) {
                return 'react-vendor';
              }
              if (id.includes('embla-carousel')) return 'embla';
              return undefined;
            },
          },
        },
      },
}));
