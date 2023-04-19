import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @HttpCode(200)
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.accountService.signIn(
      signInDto.username,
      signInDto.password,
    );
    res.cookie('access_token', result.access_token, {
      maxAge: 15 * 60,
      httpOnly: true,
    });

    return result;
  }

  @Post('register')
  signUp() {
    return {
      user_name: '6666',
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile() {
    return {
      user_info: {},
      error_message: '',
    };
  }
}
