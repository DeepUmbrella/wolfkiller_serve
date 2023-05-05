import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignFailed } from 'src/constants';
import { compare, genSalt, hashSync } from 'bcrypt';
import { SignUpDto } from './account.dto';

@Injectable()
export class AccountService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, pass: string) {
    const user = await this.usersService.findUserByName(username);
    const match = await compare(pass, user.password);
    const Salt = await genSalt(10);

    if (!match) {
      throw new UnauthorizedException(SignFailed.RES, SignFailed.DES);
    }

    const { password, user_name, id, ...result } = user;
    const payload = { user_name, sub: id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user_data: {
        user_name: user_name,
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

  signUp(createDto: SignUpDto) {
    // const hash = hashSync(myPlaintextPassword, saltRounds);
    return 1;
  }
}
