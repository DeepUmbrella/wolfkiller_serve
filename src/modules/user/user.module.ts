import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userinfo } from '../userinfo/entities/userinfo.entity';
import { UserPermission } from '../userinfo/entities/userpermission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userinfo, UserPermission])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
