import * as path from 'path';
import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  configuration,
  DataBaseConfig,
  jwtConfiguration,
} from './config/configuration';
import { LoggerMiddleware } from './common/middleware';
import { AccountModule } from './modules/account/account.module';
import { EmailModule } from './modules/email/email.module';
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

    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://user@domain.com:pass@smtp.domain.com',
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: path.resolve(__dirname, '/templates/email'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AccountModule,
    EmailModule,
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
