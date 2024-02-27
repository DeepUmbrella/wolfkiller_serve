import { Injectable } from '@nestjs/common';
import { Userinfo } from '@entities/userinfo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '@types';

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
  async findUserByEmail(email: string) {
    return await this.userinfoRepository.findOne({
      where: { email },
    });
  }
  async findUserByPhoneNumber(phone_number: string) {
    return await this.userinfoRepository.findOne({
      where: { phone_number },
    });
  }
  async createSingleUser(createDto: CreateUserDto) {
    const manager = this.userinfoRepository.manager;

    const userEntity = new Userinfo();

    userEntity.user_name = createDto.user_name;
    userEntity.password = createDto.password;
    userEntity.email = createDto.email;
    userEntity.phone_number = createDto.phone_number;
    userEntity.avatarUrl = '';
    userEntity.prefix = 0;
    userEntity.permission = 0;

    try {
      return await manager.save(userEntity);
    } catch (error) {
      return null;
    }
  }
  async createManyUsers(user_name: string) {
    return await this.userinfoRepository.findOne({
      where: { user_name },
    });
  }
}
