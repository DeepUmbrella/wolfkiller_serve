import { Controller, Get, Post } from '@nestjs/common';

import { AccountManagementService } from './account-management.service';
import { UserPermission } from '../userinfo/entities/userpermission.entity';

@Controller('management')
export class AccountManagementController {
  constructor(
    private readonly accountManagementService: AccountManagementService,
  ) {}

  @Post()
  async getManageUserlist(req, res) {
    let manager = false;
    let level = 0;
    const [permission]: UserPermission[] =
      await this.accountManagementService.checkPermission('zhangsan');
    if (permission) {
      manager = permission.permission;
      level = permission.level;
    }
    const list = await this.accountManagementService.getUserList();
    console.log(permission);
    console.log(list);
    return {
      manager,
      info: {
        level,
        list,
      },
    };
  }
}
