import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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

    console.log(pass, user.password);
    const match = await compare(pass, user.password);
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

  async signUp(createDto: SignUpDto) {
    const {
      user_name,
      password = '123456',
      email = '',
      phone_number,
      prefix,
    } = createDto;

    try {
      const checkUserExist = await this.usersService.findUserByEmail(email);
      if (checkUserExist) {
        return {
          error_code: 403,
          message: `This email address : [${checkUserExist.email}] is already registered!`,
        };
      }
      const hashPassword = hashSync(password, 10);

      const createDtoResult = await this.usersService.createSingleUser({
        user_name,
        password: hashPassword,
        email,
        phone_number,
        prefix,
      });

      return {
        error_code: 0,
        message: `Email: [${createDtoResult.email}] registration is successful, please log in with the registered email address`,
      };
    } catch (err) {
      //todo enter error to log

      return {
        error_code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'The server is busy, please try again later',
      };
    }
  }
}
