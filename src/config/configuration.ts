import { JwtModuleOptions } from '@nestjs/jwt';

export type DataBaseConfig = {
  port: number;
  database: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
};

export const configuration = () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      type: process.env.DATABASE_TYPE || 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
  };
};
export interface JwtConfig {
  jwt_config: JwtModuleOptions;
}
export const jwtConfiguration = (): JwtConfig => ({
  jwt_config: {
    secret: process.env.ACCESSTOKEN_SECRET,
    signOptions: {
      expiresIn: '60s',
    },
  },
});
