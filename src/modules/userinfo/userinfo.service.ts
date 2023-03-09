import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { Repository } from 'typeorm';
import { Userinfo } from './entities/userinfo.entity';

@Injectable()
export class UserinfoService {
  constructor(
    @InjectRepository(Userinfo)
    private wkuserinfoRepository: Repository<Userinfo>,
  ) {}
  create(createUserinfoDto: CreateUserinfoDto) {
    return 'This action adds a new userinfo';
  }

  findAll() {}

  findOne(id: number) {
    return `This action returns a #${id} userinfo`;
  }

  update(id: number, updateUserinfoDto: UpdateUserinfoDto) {
    return `This action updates a #${id} userinfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} userinfo`;
  }

  async generater() {
    const current = await this.wkuserinfoRepository.insert({
      name: 'user' + Math.floor(Math.random() * 100),
      telnumber: Math.floor(Math.random() * 1000000),
      password: '' + Math.floor(Math.random() * 1000000),
    });
    return JSON.stringify(current);
  }
}
