import { Module, MiddlewareConsumer } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration, DataBaseConfig, jwtConfiguration } from './config/configuration';
import { LoggerMiddleware } from './common/middleware';
import { AccountModule } from './modules/account/account.module';

import { CaptchaModule } from './modules/captcha/captcha.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, jwtConfiguration],
      isGlobal: true,
      envFilePath: ['.development.env', '.production.env'],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<DataBaseConfig>) => ({
        synchronize: true,
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true,
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    AccountModule,
    CaptchaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
