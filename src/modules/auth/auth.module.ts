import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.ACCESSTOKEN_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
