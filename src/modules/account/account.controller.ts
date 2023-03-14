import { Controller, Post, UseGuards, Request, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AllowAnon } from 'src/common/decorators/auth.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly authService: AuthService) {}
  @AllowAnon()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    console.log(req.user, 'req.user');
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
