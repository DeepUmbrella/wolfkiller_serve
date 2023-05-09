import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CaptchaService } from '../captcha/captcha.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get<JwtModuleOptions>('jwt_config'),
      inject: [ConfigService],
    }),
  ],
  providers: [AccountService, CaptchaService],
  controllers: [AccountController],
  exports: [],
})
export class AccountModule {}
