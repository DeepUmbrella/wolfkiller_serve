import {
  IsEmail,
  IsNotEmpty,
  Length,
  IsBoolean,
  IsString,
  IsNumber,
  Equals,
} from 'class-validator';

export class SignInDto {
  @IsString()
  @Length(4, 20)
  user_name: string;

  @Length(8, 16)
  @IsString()
  password: string;
  @IsBoolean()
  remember: boolean;
  @Equals(true)
  agree_us: boolean;

  @IsString()
  safety_verify_code: string;
}
export class SignUpDto {
  @IsEmail()
  @Length(4, 20)
  email: string;

  @IsString()
  @Length(6, 32)
  password: string;

  @IsString()
  @Length(6, 32)
  secend_password: string;

  @IsString()
  user_name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  prefix: number;
  @IsString()
  phone_number: string;
  @Equals(true)
  agree_us: boolean;
  @IsString()
  safety_verify_code: string;
}
