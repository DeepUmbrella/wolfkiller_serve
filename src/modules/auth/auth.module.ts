import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
