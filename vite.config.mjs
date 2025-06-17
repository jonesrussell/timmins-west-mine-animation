import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import viteImagemin from 'vite-plugin-imagemin';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import svgo from 'vite-plugin-svgo';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: 'app',
  publicDir: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'app/index.html'),
      },
    },
  },
  plugins: [
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'app/images/*',
          dest: 'images',
        },
        {
          src: 'app/favicon.ico',
          dest: '',
        },
        {
          src: 'app/styles/*',
          dest: 'styles',
        },
      ],
    }),
    svgo(),
  ],
  server: {
    open: true,
    fs: {
      strict: false,
    },
  },
}); 