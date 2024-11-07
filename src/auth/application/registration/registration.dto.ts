import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';

export class RegistrationRequestDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegistrationResponseDto {
  id: number;
}
