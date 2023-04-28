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

  async findUserByName(user_name: string) {
    return await this.userinfoRepository.findOne({
      where: { user_name },
    });
  }
}
