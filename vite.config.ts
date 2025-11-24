import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@nestjs/microservices', '@nestjs/websockets'],
  },
  ssr: {
    noExternal: [
      '@nestjs/common',
      '@nestjs/core',
      '@nestjs/platform-express',
      'reflect-metadata',
      'rxjs',
    ],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      formats: ['es'],
      fileName: 'main',
    },
    rollupOptions: {
      external: [
        '@nestjs/common',
        '@nestjs/core',
        '@nestjs/platform-express',
        'reflect-metadata',
        'rxjs',
      ],
    },
    target: 'node18',
    minify: false,
  },
});
