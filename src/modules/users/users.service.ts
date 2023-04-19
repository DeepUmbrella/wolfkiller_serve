import { Injectable } from '@nestjs/common';
import { Userinfo } from '../userinfo/entities/userinfo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Userinfo)
    private userinfoRepository: Repository<Userinfo>,
  ) {}

  async findUserByName(username: string) {
    return await this.userinfoRepository.findOne({ where: { name: username } });
  }
}
