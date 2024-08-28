import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const dbConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== 'production',
  entities: [path.resolve(__dirname, '..', 'entities/*.entity{.ts,.js}')],
});
