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

  async checkUserExistByName(username: string) {
    return await this.hh_accountRepository.findOne({ where: { username } });
  }

  async Login(username: string, password: string, mac_id: string) {
    const res = await this.hh_accountRepository.findOne({ where: { username, mac_id } });

    if (!res) {
      return { result: 'fail', message: '用户不存在或注册设备与登录设备不符' };
    }

    if (res.password !== password) {
      return { result: 'fail', message: '用户名或密码错误' };
    }

    if (res?.enable === false) {
      return { result: 'fail', message: '当前用户被禁用' };
    }

    return { result: 'success', message: '登录成功' };
  }

  async Register(username: string, password: string, mac_id: string) {
    if (await this.checkUserExistByName(username)) {
      return { result: 'fail', message: '用户已存在' };
    }

    const hh_user = new HH_User();
    hh_user.enable = false;
    hh_user.username = username;
    hh_user.password = password;
    hh_user.mac_id = mac_id;

    const res = await this.hh_accountRepository.save(hh_user);

    return { result: 'success', data: res, message: '注册成功等待管理员审核...' };
  }

  async getAllUsers() {
    const users = await this.hh_accountRepository.find();
    return { result: users, total: users.length };
  }
  async changeUserStatus(username: string, enable: boolean) {
    try {
      await this.hh_accountRepository.update({ username }, { enable });
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteUser(username: string) {
    try {
      await this.hh_accountRepository.delete({ username });
      return true;
    } catch (error) {
      return false;
    }
  }

  async update_password(username: string, password: string) {
    try {
      await this.hh_accountRepository.update({ username }, { password });
      return true;
    } catch (error) {
      return false;
    }
  }
}
