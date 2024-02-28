import { Controller, UseGuards, Get, Post, Body, Param, Query } from '@nestjs/common';
import { HH_AccountService } from './hh_account.service';
import { AuthGuard } from '@guards/auth.guard';

@Controller('/hh_app')
export class HH_AccountController {
  constructor(private hh_accountService: HH_AccountService) {}

  @Post('login')
  async hh_app_login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('mac_id') mac_id: string,
  ) {
    return await this.hh_accountService.Login(username, password, mac_id);
  }

  @Post('register_user')
  async hh_app_register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('mac_id') mac_id: string,
  ) {
    return await this.hh_accountService.Register(username, password, mac_id);
  }
  @UseGuards(AuthGuard)
  @Get('hh_user_list')
  async hh_app_user_list() {
    return await this.hh_accountService.getAllUsers();
  }
}
