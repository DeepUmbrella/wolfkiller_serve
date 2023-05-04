import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignFailed } from 'src/constants';

@Injectable()
export class AccountService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string) {
    const user = await this.usersService.findUserByName(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException(SignFailed.RES, SignFailed.DES);
    }

    const { password, id, ...result } = user;
    const payload = { user_name: user.user_name, sub: id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user_data: {
        user_name: result.user_name,
        avatar_url: result.avatarUrl,
      },
    };
  }
  async profile(username: string) {
    const user = await this.usersService.findUserByName(username);
    if (!user) {
      throw new UnauthorizedException(SignFailed.RES, SignFailed.DES);
    }
    return {
      user_data: {
        user_name: user.user_name,
        avatar_url: user.avatarUrl,
      },
    };
  }

  signUp(arg: any) {
    return 1;
  }
}
