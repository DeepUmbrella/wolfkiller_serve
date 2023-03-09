import { Module } from '@nestjs/common';
import { AccountManagementController } from './account-management.controller';
import { AccountManagementService } from './account-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userinfo } from '../userinfo/entities/userinfo.entity';
import { UserPermission } from '../userinfo/entities/userpermission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userinfo, UserPermission])],
  controllers: [AccountManagementController],
  providers: [AccountManagementService],
})
export class AccountManagementModule {}
