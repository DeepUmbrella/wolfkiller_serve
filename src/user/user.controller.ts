import {
  Controller,
  Get,
  HttpCode,
  Res,
  Req,
  Post,
  Body,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  @HttpCode(200)
  getUserinfo(@Req() req, @Res() res): string {
    console.log(req, 123);
    res.status(401);
    res.send('yosrege');
    res.end();
    return 'user not found in this page';
  }

  @Post('login')
  @HttpCode(200)
  userLogin(req, res): string {
    console.log(req, res);
    return JSON.stringify({
      code: 200,
      loginStatus: 'successful',
    });
  }
}
