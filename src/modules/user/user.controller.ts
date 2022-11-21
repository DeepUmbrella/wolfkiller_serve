import {
  Controller,
  Get,
  HttpCode,
  Res,
  Req,
  Post,
  Body,
  Header,
  ForbiddenException,
  UseFilters,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { UserService } from './user.service';

import { HttpExceptionFilterFilter } from 'src/common/http-exception-filter';
import { Session } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  @Header('Content-Type', 'application/json;charset=utf-8')
  getUserinfo(): string {
    return JSON.stringify({
      code: 200,
      message: 'get userinfo successful!',
    });
  }

  @Post()
  userUpdate(req, @Res({ passthrough: true }) res: Response) {
    console.log(req, res);
    res.status(200).send(`{ "name": "yanglin", "age": 19 }`).end();
  }

  @Post('login')
  @Header('Content-Type', 'application/json;charset=utf-8')
  userLogin(
    @Body('validate') vlidate: string,
    @Session() session: { code: string },
    @Res({ passthrough: true }) res,
  ) {
    console.log(Body, session);
    const ispass = vlidate?.toLowerCase() === session.code.toLowerCase();
    res
      .status(ispass ? 200 : 401)
      .json({
        code: ispass ? 200 : 401,
        message: ispass ? 'pass' : 'reject',
      })
      .end();
  }

  @Post('createaccount')
  @Header('Content-Type', 'application/json;charset=utf-8')
  userCreateAccount(req, @Res({ passthrough: true }) res: Response) {
    return 'success';
  }

  @Get('logout')
  @Header('Content-Type', 'application/json;charset=utf-8')
  userLogOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req);
    if (!!req) {
      res.status(200).json({ code: 200, message: 'logout sucessful' });
    } else {
      res
        .status(200)
        .json({ code: 200, message: 'logout fail ,you do not login!' });
    }
    res.end();
  }

  @Post('filter')
  @UseFilters(new HttpExceptionFilterFilter())
  async create(@Body() body) {
    throw new HttpException(
      {
        errorMessage: 'This service is updating ,we will be back 3:00AM-5:00AM',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('captcha')
  @Header('content-type', 'image/svg+xml')
  createCaptch(@Headers('_auth') auth, @Session() session) {
    console.log(session);
    const captch = this.userService.createCaptcha(auth, session);
    return captch;
  }
}
