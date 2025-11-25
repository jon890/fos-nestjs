import type { Config } from 'drizzle-kit';

/**
 * drizzle kit 을 위한 설정 파일
 */
export default {
  schema: [
    './src/**/infra/*.schema.ts', // 각 도메인별 infra 폴더의 스키마 파일
  ],
  out: './drizzle/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_URL!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
} satisfies Config;
