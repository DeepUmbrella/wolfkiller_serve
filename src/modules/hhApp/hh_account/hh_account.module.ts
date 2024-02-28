import { Module } from '@nestjs/common';
import { HH_AccountService } from './hh_account.service';
import { HH_AccountController } from './hh_account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HH_User } from '@entities/hh_user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HH_User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get<JwtModuleOptions>('jwt_config'),
      inject: [ConfigService],
    }),
  ],
  providers: [HH_AccountService],
  controllers: [HH_AccountController],
  exports: [],
})
export class HH_AccountModule {}
