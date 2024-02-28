import { Injectable } from '@nestjs/common';
import { HH_User } from '@entities/hh_user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HH_AccountService {
  constructor(
    @InjectRepository(HH_User)
    private hh_accountRepository: Repository<HH_User>,
  ) {}

  async Login(username: string, password: string, mac_id: string) {
    const res = await this.hh_accountRepository.findOne({ where: { username, password, mac_id } });

    const pass = res?.enable === true && res.password === password;

    return { result: pass ? 'success' : 'fail' };
  }

  async Register(username: string, password: string, mac_id: string) {
    const hh_user = new HH_User();
    hh_user.enable = true;
    hh_user.username = username;
    hh_user.password = password;
    hh_user.mac_id = mac_id;

    const res = await this.hh_accountRepository.save(hh_user);

    return { result: 'success', data: res };
  }

  async getAllUsers() {
    const users = await this.hh_accountRepository.find();
    return { result: users, total: users.length };
  }
}
