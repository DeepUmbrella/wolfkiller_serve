import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { generateCaptchaCode } from 'src/uilts';

export type CaptchaType = 'email' | 'image';

@Injectable()
export class CaptchaService {
  createCaptcha = (captcha_type: CaptchaType = 'image', length = 4) => {
    if (captcha_type === 'image') {
      const R = Math.floor(Math.random() * 256).toString();
      const G = Math.floor(Math.random() * 256).toString();
      const B = Math.floor(Math.random() * 256).toString();

      const captchaConfig = {
        size: length,
        fontSize: 32,
        with: 100,
        height: 32,
        background: `rgb(${R}, ${G}, ${B})`,
      };

      return svgCaptcha.create(captchaConfig);
    }
    const text = generateCaptchaCode(length);
    return {
      text,
      data: undefined,
    };
  };

  validateCaptcha = (
    captcha_code: string,
    session_captcha_code: string,
  ): boolean => {
    if (captcha_code && session_captcha_code)
      return captcha_code === session_captcha_code;
    return false;
  };
}
