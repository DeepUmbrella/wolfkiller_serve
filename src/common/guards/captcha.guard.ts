import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { CaptchaFailed } from 'src/constants';
import { CaptchaService } from 'src/modules/captcha/captcha.service';

export interface SessionRequest extends Request {
  session: any;
}

@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(private captchaService: CaptchaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<SessionRequest>();
    const { captcha_code, session_captcha_code } =
      this.extractSafetyVerifyCodeFromBodyOrSessionCaptchaCode(request);
    console.log(captcha_code, session_captcha_code);
    if (!captcha_code || !session_captcha_code || captcha_code !== session_captcha_code) {
      throw new UnauthorizedException(CaptchaFailed.RES, CaptchaFailed.DES);
    }

    return true;
  }

  private extractSafetyVerifyCodeFromBodyOrSessionCaptchaCode(request: SessionRequest) {
    const captcha_code = request.body?.safety_verify_code;
    const session_captcha_code = request.session?.captcha_code;
    return {
      captcha_code,
      session_captcha_code,
    };
  }
}
