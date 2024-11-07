import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { User } from 'src/auth/domain/models/user.entity';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class LoginResponseDto {
  email: string;
  token: string;
  userData: Partial<User>;
}
