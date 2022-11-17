import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleGuardService } from './role-guard.service';

@Controller('admin')
@UseGuards(RolesGuard)
export class RoleGuardController {
  constructor(private readonly roleGuardService: RoleGuardService) {}

  @Get('*')
  @Roles('admin', 'super')
  getRolesPermissions(): string {
    console.log('正在验证身份中。。。。。。。。');
    return JSON.stringify({
      code: 200,
      message: 'get userinfo successful!',
    });
  }

  @Post('*')
  @Roles('admin')
  postRolesPermissions(): string {
    console.log('正在验证身份中。。。。。。。。');
    return JSON.stringify({
      code: 200,
      message: 'get userinfo successful!',
    });
  }
}
