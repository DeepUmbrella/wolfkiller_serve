import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller('account')
export class AccountController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req.user, 'req.user');
    return this.authService.login(req.user);
  }
}
