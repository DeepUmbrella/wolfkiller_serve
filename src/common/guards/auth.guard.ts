import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ALLOW_KEY } from '../decorators/auth.decorator';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Anonymous, ExpiredCert } from '../../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(ALLOW_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaderCookie(request);

    if (!token) {
      throw new UnauthorizedException(Anonymous.RES, Anonymous.DES);
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get('jwt_config').secret,
      });

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(ExpiredCert.RES, ExpiredCert.DES);
    }
    return true;
  }

  private extractTokenFromHeaderCookie(request: Request): string | undefined {
    return request.query?.token as string;
  }
}
