import {
  Controller,
  Get,
  HttpCode,
  Res,
  Req,
  Post,
  Body,
  Header,
  Headers,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Controller('user')
export class UserController {
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

  @Get('login')
  @Header('Content-Type', 'application/json;charset=utf-8')
  @Header(
    'set-cookie',
    'auth=0092f7d3a58c877df398283abea48726;path=/;domain=localhost;Max-Age=300;httponly',
  )
  userLogin(req, @Res({ passthrough: true }) res: Response) {
    res.end();
  }

  @Post('createaccount')
  @Header('Content-Type', 'application/json;charset=utf-8')
  userCreateAccount(req, @Res({ passthrough: true }) res: Response) {}

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
}
