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
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Response } from 'express';
import { RegisterValidationPipe } from 'src/common/pipe/regiseter.pipe';

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
    res.cookie('auth', result.access_token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
    });

    return {
      error_message: '',
      error_code: 0,
      user_info: result.user_data,
    };
  }

  @Post('register')
  @UsePipes(new RegisterValidationPipe())
  signUp() {
    return {
      user_name: '6666',
    };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    const result = await this.accountService.profile(req?.user?.user_name);
    return {
      error_message: '',
      error_code: 0,
      user_info: result.user_data,
    };
  }
}
