import { Module } from '@nestjs/common';
import { HH_AccountService } from './hh_account.service';
import { HH_AccountController } from './hh_account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HH_User } from '@entities/hh_user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HH_User])],
  providers: [HH_AccountService],
  controllers: [HH_AccountController],
  exports: [],
})
export class HH_AccountModule {}
