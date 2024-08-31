declare namespace NodeJS {
  interface ProcessEnv {
    // DATABASE
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;

    // JWT
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;

    // NODE_ENV
    NODE_ENV: 'production' | 'development' | 'test';
  }
}
