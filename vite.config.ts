import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  ssr: {
    // react-helmet-async ships as CJS; bundle it into the SSR output so the
    // prerender script's dynamic import resolves its named exports as ESM.
    noExternal: ['react-helmet-async'],
  },
});
