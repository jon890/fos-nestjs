import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';
import swc from 'unplugin-swc';
import { resolve } from 'path';
import type { Plugin } from 'vite';

export default defineConfig({
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    tsconfigPaths(), // tsconfig.json의 baseUrl과 paths를 자동으로 적용
    swc.vite({
      // 데코레이터 메타데이터 지원을 위해 SWC 사용
      jsc: {
        parser: {
          syntax: 'typescript',
          decorators: true,
        },
        transform: {
          decoratorMetadata: true,
        },
      },
    }),
    ...VitePluginNode({
      adapter: 'express',
      appPath: 'src/main.ts',
      tsCompiler: 'swc', // SWC 사용 (데코레이터 메타데이터 지원)
    }),
  ],

  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },

  server: {
    port: 3000,
  },

  optimizeDeps: {
    exclude: ['@nestjs/common', '@nestjs/core', '@nestjs/platform-express'],
  },
});
