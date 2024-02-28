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

  @Post('delete_hh_user')
  async delete_hh_app_user(@Body('username') username: string) {
    const res = await this.hh_accountService.deleteUser(username);
    return { result: res ? 'success' : 'fail' };
  }

  @Post('update_hh_user_status')
  async update_hh_app_user_status(
    @Body('username') username: string,
    @Body('enable') enable: boolean,
  ) {
    const res = await this.hh_accountService.changeUserStatus(username, enable);
    return { result: res ? 'success' : 'fail' };
  }

  @Post('update_hh_user_info')
  async update_hh_app_user_info(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const res = await this.hh_accountService.update_password(username, password);
    return { result: res ? 'success' : 'fail' };
  }
}
