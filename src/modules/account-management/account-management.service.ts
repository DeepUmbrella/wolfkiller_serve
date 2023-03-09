import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Userinfo } from '../userinfo/entities/userinfo.entity';
import { UserPermission } from '../userinfo/entities/userpermission.entity';

@Injectable()
export class AccountManagementService {
  constructor(
    @InjectRepository(Userinfo)
    private userinfoRepository: Repository<Userinfo>,
    @InjectRepository(UserPermission)
    private userPermissionRepository: Repository<UserPermission>,
  ) {}
  getUserList(): Promise<Userinfo[]> {
    return this.userinfoRepository.find();
  }
  checkPermission(name: string): Promise<UserPermission[]> {
    return this.userPermissionRepository.find({ where: { name: name } });
  }
}
