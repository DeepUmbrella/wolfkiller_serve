import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { Userinfo } from './entities/userinfo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Userinfo])],
  controllers: [UserinfoController],
  providers: [UserinfoService],
})
export class UserinfoModule {}
