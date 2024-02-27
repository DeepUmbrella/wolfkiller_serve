import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { AccountService } from './account.service';
import { AuthGuard } from '@guards/auth.guard';
import { CaptchaGuard } from '@guards/captcha.guard';
import { Response } from 'express';

import { SignInDto, SignUpDto } from './account.dto';
import { SignInValidationPipe, SignUpValidationPipe } from '@pipe';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('login')
  async signIn(
    @Body(SignInValidationPipe) signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.accountService.signIn(signInDto.username, signInDto.password);
    res.cookie('auth', result.access_token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });

    return {
      message: '',
      error_code: 0,
      code: 20000,
      data: {
        token: result.access_token,
        name: result.user_data.user_name,
      },
    };
  }

  @UseGuards(CaptchaGuard)
  @Post('register')
  async signUp(
    @Body(SignUpValidationPipe) signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { error_code = 200, message } = await this.accountService.signUp(signUpDto);

    res.status(error_code < 200 ? 200 : error_code);

    return {
      message,
      error_code,
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    const result = await this.accountService.profile(req?.user?.user_name);
    return {
      code: 20000,
      data: {
        ...result.user_data,
        roles: ['admin'],
        introduction: 'I am a super administrator',
      },
    };
  }

  @Post('logout')
  async logout() {
    //todo
    return {
      code: 20000,
      data: 'success',
    };
  }
}
