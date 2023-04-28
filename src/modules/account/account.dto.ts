export interface SignInDto {
  user_name: string;
  password: string;
  remember: boolean;
  agree_us: boolean;
  safety_verify_code: string;
}
export interface SignUpDto {
  email: string;
  password: string;
  secend_password: string;
  nick_name: string;
  prefix: string;
  phone_number: string;
  agree_us: boolean;
  safety_verify_code: string;
}
