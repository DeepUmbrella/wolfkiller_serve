import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userinfo } from '../userinfo/entities/userinfo.entity';
import { UserPermission } from '../userinfo/entities/userpermission.entity';
import * as svgCaptcha from 'svg-captcha';

const captchaConfig = {
  size: 4,
  fontSize: 50,
  with: 100,
  height: 34,
  background: '#fafafa',
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Userinfo)
    private userinfoRepository: Repository<Userinfo>,
    @InjectRepository(UserPermission)
    private userPermissionRepository: Repository<UserPermission>,
  ) {}
  createCaptcha = (auth: string, session) => {
    const { text, data } = svgCaptcha.create(captchaConfig);
    session.code = text;
    return data;
  };

  async checkUser(username: string): Promise<Userinfo | undefined> {
    return await this.userinfoRepository.findOne({ where: { name: username } });
  }
}
