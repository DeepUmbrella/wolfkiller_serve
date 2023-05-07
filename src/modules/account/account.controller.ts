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
import * as bcrypt from 'bcrypt';
import { AccountService } from './account.service';
import { AuthGuard } from '@guards/auth.guard';
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
    console.log(signInDto, 'signInDto');
    const result = await this.accountService.signIn(
      signInDto.user_name,
      signInDto.password,
    );
    res.cookie('auth', result.access_token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });

    return {
      message: '',
      error_code: 0,
      user_info: result.user_data,
    };
  }

  @Post('register')
  async signUp(
    @Body(SignUpValidationPipe) signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { error_code = 200, message } = await this.accountService.signUp(
      signUpDto,
    );

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
      message: '',
      error_code: 0,
      user_info: result.user_data,
    };
  }
}
