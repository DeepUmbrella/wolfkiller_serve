import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userinfo } from '../userinfo/entities/userinfo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userinfo])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
