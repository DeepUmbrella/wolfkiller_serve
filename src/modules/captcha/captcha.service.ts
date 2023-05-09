import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

const captchaConfig = {
  size: 4,
  fontSize: 50,
  with: 100,
  height: 34,
  background: 'rgb(119, 98, 6)',
};

@Injectable()
export class UserService {
  createCaptcha = (auth: string, session) => {
    const { text, data } = svgCaptcha.create(captchaConfig);
    session.code = text;
    return data;
  };
}
